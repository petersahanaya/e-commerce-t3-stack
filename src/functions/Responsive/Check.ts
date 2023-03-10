import { useEffect, useState } from "react";

export function useResponsive(pixel : "1024" | "1280" | "1536") {
    const [isResponsive, setIsResponsive] = useState(false)

    useEffect(() => {
        setIsResponsive(window.matchMedia(`screen and (min-width: ${pixel}px)`).matches)
    }, [pixel])

    console.log(isResponsive)


    return [isResponsive]
}