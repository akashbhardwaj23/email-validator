import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";

export default function SignIn() {
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleSignIn = async () => {
        if(emailRef.current && passwordRef.current){
            //@ts-ignore
            const email = emailRef.current.value
            //@ts-ignore
            const password = passwordRef.current.value

            try {

                if(!email || !password){
                    alert("Fill The Details")
                    return 
                }

                const response = await axios.post(`${BACKEND_URL}/api/login`, {
                    email : email,
                    password
                })

                const data = response.data

                localStorage.setItem("email", email)
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
                        Log Into Your Account
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
            <div className="flex flex-col mx-auto w-96 mb-4">
                <Button onClick={handleSignIn}>SignIn</Button>
            </div>

            <div className="flex justify-center">
                <p>Dont Have an Account</p>
                <span onClick={() => navigate({to : "/signup"})} className="underline cursor-pointer ml-2">SignUp</span>
            </div>
        </div>
      </div>
    </div>
  );
}
