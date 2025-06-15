import { Vibur } from "next/font/google"
import ThemeToggle from "../ThemeToggle"

const work_sans = Vibur({
  subsets : ['latin'],
  weight: ['400']
})


type Props = {
    children : React.ReactNode
}
const MainLayout = ({children} : Props) => {
  return (
    <div className="flex flex-col h-screen">
            <nav className="w-full dark:bg-gray-800 dark:text-white shadow-md  text-black p-4">
              <h1 className={`${work_sans.className} text-center text-2xl`}>PANEO</h1>
            </nav>
            
            <main className="flex-1 bg-gray-100 dark:transition-all dark:ease-out dark:bg-slate-700 p-6 overflow-auto">
                {children}
            </main>

            <div>
              <ThemeToggle/>
            </div>
    </div>
  )
}

export default MainLayout
