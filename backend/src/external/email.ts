import { Resend } from "resend";



const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (email: string, otp : string) => {
    try {
        const response = await resend.emails.send({
            from : process.env.EMAIL!,
            to : email,
            subject : "Otp For Email Verification",
            html : `<p>Your OTP For Email Verification is <strong>${otp}</strong></p>`
        })

        const data = response.data;
        return data?.id
    } catch (error) {
        console.log(error)
         Error("Email Not Sent")
    }
};
