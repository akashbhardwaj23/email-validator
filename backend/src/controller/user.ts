import type { Request, Response } from "express";
import { LoginInput } from "../zod/type";
import { verifyEmail } from "../utils/email-validator";
import { verifyPaasword } from "../utils/password-validator";
import { checkemail } from "../external/checkemailValidity";
import { generateOtp } from "../utils/generate-opt";
import { sendEmail } from "../external/email";



interface OtpInterfaceType {
    email : string
    id : string
    otp : string
}

const otps:OtpInterfaceType[] = []

export const login = async (req : Request, res : Response) => {
        const success = LoginInput.safeParse(req.body)

        if(!success.success){
            res.status(403).json({
                message : "Input is not correct"
            })
            return
        }

        const data = success.data;

        const isValidEmail = await verifyEmail(data.email)
        console.log(data.email)
        console.log(isValidEmail)
        if(!isValidEmail){
            res.status(404).json({
                message : "Email is Not Valid"
            })
            return
        }

        const isValidPassword = verifyPaasword(data.password)
        console.log(data.password)
        if(!isValidPassword){
            res.status(403).json({
                message : "Password is Not Valid"
            })
            return
        }

        const otp = await generateOtp()


        
        if(otps.find(otp => otp.email === data.email)){
            res.status(201).json({
                message : "OTP Already Sent"
            })
            return
        }

        const id = await sendEmail(data.email, otp)

        if(!id){
            res.status(404).json({
                message : "Email Not Sent"
            })
            return
        }


        otps.push({
            email : data.email,
            id : id,
            otp : otp
        })

        res.status(200).json({
            message : "Email Sent"
        })

}


export const verifyOtp = async (req : Request, res : Response) => {
    const {otp, email} = req.body

    const isValidEmail = verifyEmail(email);

    console.log(email, otp)
    
    if(!isValidEmail){
        res.status(403).json({
            message : "Email is Not Valid"
        })
        return
    }

    const value = otps.find(val => {
        if(val.email === email){
            return true
        }
    })


    if(!value){
        res.status(403).json({
            message : "No Email Found"
        })
        return
    }

    const isOtpValid = checkOtp(value.otp, otp)

    if(!isOtpValid){
        res.status(403).json({
            message : "Otp is Incorrect",
            validOtp : false
        })
        return
    }
    

    res.json({
        message : "Otp Valid",
        validOtp : isOtpValid
    })

}


function checkOtp(storedOtp : string, otp : string){
    const isOtpValid = storedOtp === otp
    return isOtpValid
}