import { NumberFormat } from "@/functions/Format/format"
import Image from "next/image"

const Card: React.FC<{ props: Product }> = ({ props }) => {
  return (
    <nav className="bg-stone-200 hover:scale-105 transition-[300ms] flex flex-col items-center gap-1 w-[75vw] m-auto rounded-xl relative xl:w-[400px] 3xl:w-[1000px] 3xl:h-[800px] 4xl:w-[750px] md:w-[350px]">
      <div className="relative w-[200px] h-[170px] 3xl:w-[800px] 3xl:h-[600px]">
        <Image className="mix-blend-darken" loading="lazy" src={props.image} alt={props.title} fill />
      </div>
      <div>
        <p className="text-sm 3xl:text-5xl 3xl:mb-3 tracking-wider text-stone-600">{props.title}</p>
        <p className="font-[500] 3xl:text-6xl tracking-wider text-stone-700">{NumberFormat(props.price)}</p>
      </div>
      <p className="absolute top-0 right-0 3xl:text-5xl 3xl:p-6 bg-neutral-900 rounded-bl-xl p-2 text-[.8rem] rounded-tl-xl text-stone-50 4xl:text-3xl">{props.category}</p>
    </nav>
  )
}

export default Card
