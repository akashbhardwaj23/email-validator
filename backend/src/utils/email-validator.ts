import validator from "email-validator"


export const verifyEmail = async (email : string) => {
    const isEmailValid = validator.validate(email)
    
    return isEmailValid
}