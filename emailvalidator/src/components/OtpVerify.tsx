import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { InputOTP, InputOTPSlot } from "./ui/input-otp";
import axios from "axios"
import { BACKEND_URL } from "../config";

export default function OtpVerify() {
    const [otpResend, setOtpResend] = useState(false)

    const inputRef = useRef(null)

    const handleOtpResend = () => {
        setOtpResend(true)

        setTimeout(() => {
            setOtpResend(false)
        }, 5000)
    }


    const handleOtp = async () => {
        if(inputRef.current){
            //@ts-ignore
            const value = inputRef.current.value
            try {
                const email = localStorage.getItem("email")

                const response = await axios.post(`${BACKEND_URL}/api/verifyOtp`, {
                    email,
                    otp : value
                })

                const data = response.data;
                
                alert(data.validOtp)

            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <div className="flex justify-center items-center">
      <div className="relative top-20">
        <div className="p-4">
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-xl">
                    Verify OTP 
                </h1>
            </div>

            <div className="flex flex-col items-center mb-2">
                <InputOTP maxLength={5} ref={inputRef}>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                </InputOTP>
            </div>

           {otpResend ? (
                <div className="flex flex-col items-end mb-4">Otp Sent Check Email</div>
            ) : ( <div className="flex flex-col items-end underline cursor-pointer mb-4" onClick={handleOtpResend}>
                Resend Otp
            </div>) }

            <div className="flex flex-col items-center">

                <Button onClick={handleOtp}>Verify</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
