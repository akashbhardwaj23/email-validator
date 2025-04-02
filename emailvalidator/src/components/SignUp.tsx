import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios"
import { useRef } from "react";
import { BACKEND_URL } from "../config";


export default function SignUp(){
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleSignUp = async () => {
        if(emailRef.current && passwordRef.current){
            //@ts-ignore
            const email = emailRef.current.value
            //@ts-ignore
            const password = passwordRef.current.value

            try {
                const response = await axios.post(`${BACKEND_URL}/api/login`, {
                    email,
                    password
                })

                const data = response.data

                navigate({to : "/verify"})
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="flex justify-center items-center">
      <div className="relative w-1/2 top-20">
        <div className="p-4">
            <div className="flex justify-center w-full m-auto mb-8">
                    <h1 className="text-xl">
                        Signup Into Your Account
                    </h1>
            </div>

            <div className="flex flex-col mx-auto w-96 mb-4">
                <span className="mb-2">Email</span>
                <Input placeholder="email" ref={emailRef} />
            </div>
            <div className="flex flex-col mx-auto w-96 mb-8">
                <div className="flex justify-between mb-2"><span>Password</span>
                <span>Forgot Password</span></div>
                <Input placeholder="password" ref={passwordRef} />
            </div>
            <div className="flex flex-col mx-auto w-96">
                <Button onClick={handleSignUp}>SignUp</Button>
            </div>
        </div>
      </div>
    </div>
    )
}