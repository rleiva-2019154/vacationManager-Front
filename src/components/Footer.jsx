import { TbWorldWww } from "react-icons/tb";
import logo from '../assets/img/logoGeko.png'

export const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-400 p-4 flex justify-between items-center">
        <aside className="flex items-center ml-8">
            <img 
                src={logo}
                alt="Letras de la empresa" 
                width="50"
                height="70"
            />
            <span className="ml-4 flex items-center">
                <p className="m-0 p-0 leading-none text-base">
                    {new Date().getFullYear()} Geko Digital
                </p>
            </span>
        </aside>
        <nav className='flex items-center mr-8'>
            <a 
                href="https://digitalgeko.com/"
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center'
            >
                <TbWorldWww size={30}/>
            </a>
        </nav>
    </footer>
)
}
