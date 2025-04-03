import { Router } from "express";
import { login, resendOtp, verifyOtp } from "../controller/user";


const router = Router()

router.post("/login", login)
router.post("/verifyOtp", verifyOtp)
router.post("/resendOtp", resendOtp)


export default router