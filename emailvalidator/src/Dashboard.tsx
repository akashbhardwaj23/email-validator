import { useEffect, useState } from "react"
import Confetti from "react-confetti"


export default function DashBoard(){

    const [windowSize, setWindowSize] = useState({
        width : window.innerWidth - 1,
        height : window.innerHeight - 1
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                height : window.innerHeight - 1,
                width : window.innerWidth - 1
            })
        }

        window.addEventListener("resize", handleResize)


        return () => window.removeEventListener("resize", handleResize)
    }, [])


    return (
        <div className="flex justify-center items-center">
            <Confetti width={windowSize.width} height={windowSize.height} />
            <div className="relative top-20">
                <h1 className="flex justify-center items-center sm:text-6xl text-4xl">
                    Congratulations
                </h1>
            </div>
        </div>
    )
}