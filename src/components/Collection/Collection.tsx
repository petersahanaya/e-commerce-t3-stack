import Card from "./Card"

const Collection : React.FC<{collections : Product[]}>= ({collections}) => {
  return (
    <main className="p-2 w-screen xl:p-6 3xl:p-12 md:p-4">
        <h4 className="text-stone-100 font-[700] text-2xl mb-2 xl:mb-5 3xl:mb-10 3xl:text-8xl md:mb-4 md:text-3xl"><span className="text-teal-300">Best</span> Collection&apos;s 👟</h4>
        <Card collections={collections}/>
    </main>
  )
}

export default Collection