import axios from "axios"

const ZEROBOUNCE_URL = 'https://api.zerobounce.net/v2/validate'

export const checkemail = async (email : string) => {
    const response = await axios.post(`${ZEROBOUNCE_URL}?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${email}`)

    const data = response.data;
    console.log(data)
    return data.status === "valid"
}
