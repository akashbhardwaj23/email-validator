


export const verifyPaasword = (password : string) => {
    const regex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\/-]).{4,12}$"
      );

    const isValidPassword = regex.test(password)

    console.log(isValidPassword)

    return isValidPassword
}