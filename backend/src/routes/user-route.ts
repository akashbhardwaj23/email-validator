import { Router } from "express";
import { login, verifyOtp } from "../controller/user";


const router = Router()

router.post("/login", login)




router.post("/verifyOtp", verifyOtp)


export default router