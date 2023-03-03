import Image from "next/image"

const Images : React.FC<{src? : string, width : number, height : number, property? : string, alt : string}> = ({src = "/profile.jpeg", property = "rounded-full", width, height, alt}) => {
  return (
    <>
    <Image className={property} src={src} width={width} height={height} alt={alt}/>
    </>
  )
}

export default Images