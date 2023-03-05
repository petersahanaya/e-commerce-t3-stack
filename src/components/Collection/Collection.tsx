import Card from "./Card"

const Collection : React.FC<{collections : Product[]}>= ({collections}) => {
  return (
    <main className="p-2 w-screen">
        <h4 className="text-stone-100 font-[700] text-2xl mb-2"><span className="text-teal-300">Best</span> Collection&apos;s 👟</h4>
        <Card collections={collections}/>
    </main>
  )
}

export default Collection