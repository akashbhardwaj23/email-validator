import { v4 as uuidV4 } from "uuid"


export const generateOtp = async () => {
    const otp = uuidV4().slice(0,5)
    return otp
}