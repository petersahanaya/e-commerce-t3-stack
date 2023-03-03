import {GoSignOut} from "react-icons/go"
const Sidebar = () => {
  return (
    <aside className="w-[70vw] bg-neutral-800/90 backdrop-blur-sm h-screen fixed top-0 right-0 z-20">
        <div className="flex mt-20 justify-center items-center gap-2 ">
            <GoSignOut className="text-stone-100"/>
            <p className="text-stone-100 selection:bg-transparent font-[400] tracking-wide">Sign Out</p>
        </div>
    </aside>
  )
}

export default Sidebar