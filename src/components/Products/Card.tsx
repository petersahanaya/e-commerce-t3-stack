import { NumberFormat } from "@/functions/Format/format"
import Image from "next/image"

const Card: React.FC<{props : Product}> = ({props}) => {
  return (
    <nav className="bg-stone-200 flex flex-col items-center gap-1 w-[250px] m-auto rounded-xl relative">
        <div className="relative w-[200px] h-[170px]">
            <Image className="mix-blend-darken" loading="lazy" src={props.image} alt={props.title} fill/>
        </div>
        <div>
          <p className="text-sm text-stone-600">{props.title}</p>
          <p className="font-[500] tracking-wide text-stone-700">{NumberFormat(props.price)}</p>
        </div>
        <p className="absolute top-0 right-0 bg-neutral-900 rounded-bl-xl p-2 text-[.8rem] rounded-tl-xl text-stone-50">{props.category}</p>
    </nav>
  )
}

export default Card