import dns from "dns/promises"


export const verifyDomain = async (email : string) => {
    const domain = email.split("@")[1]!;

    const mxRecord = await dns.resolveMx(domain)

    console.log(mxRecord)

    return mxRecord.length > 0
}