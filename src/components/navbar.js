"use client";
import {useContext} from 'react';
import { FaBell, FaCog } from 'react-icons/fa';
import Link from "next/link";
import {UserContext} from "@/servicesAuth/authService";
import NotConnected from "@/components/NotConnected";



const NavBar = () => {



    const { userContext, logout } = useContext(UserContext);


    if (!userContext)
    {
        return (
            <NotConnected/>
        )
    }
    else {
        const Menu = [
            {
                id: 1,
                name: "Home",
                link: "/AnnulationClientPage",
            },
            {
                id: 2,
                name: "Mes Voyages",
                link: "/AnnulationClientPage",
            },
            {
                id: 3,
                name: "Mes coupons",
                link: "/AnnulationClientPage/Coupons",
            },
            {
                id: 4,
                name: "Consulter mes historiques",
                link:'/AnnulationClientPage/HistoriqueClient',
            },
            {
                id: 5,
                name: "Aide",
                link: "/AnnulationClientPage/Aide",
            }
        ];

        return(
            <>
                <div className='w-full h-24 bg-primary flex justify-between'>
                    <div className='justify-between flex items-center'>
                        <a  href ="/AnnulationClientPage" className=' px-5 py-2 flex gap-4  text-3xl text-tertiary font-bold cursor-pointer'>
                            <p>Mooving.com</p>
                        </a>
                        <div>
                            <ul className='flex items-center gap-4'>
                                {Menu.map((data) => (
                                    <li key = {data.id} className='text-1xl text-white font-bold cursor-pointer flex px-2 '>
                                        <Link href ={data.link} className='hover:bg-opacity-90
                                                                    focus:rounded-3xl focus:p-2 focus:text-primary focus:bg-white
                                                                    hover:rounded-3xl hover:p-2 hover:bg-tertiary hover:text-primary transition-all duration-300' >
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex justify-between items-center
                                gap-4 cursor-pointer text-white duration-300 '>
                        <a href="#" className=" hover:bg-white hover:bg-opacity-50 hover:rounded-3xl hover:p-2 transition-all duration-300">
                            <FaBell className="text-tertiary"/>
                            <div className=" bg-white bg-opacity-50 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <a href="#" className=" hover:bg-white hover:bg-opacity-50 hover:rounded-3xl hover:p-2 transition-all duration-300">
                            <FaCog className="text-tertiary" />
                            <div className=" bg-white bg-opacity-50 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        <button onClick={logout} className='focus:rounded-3xl focus:p-2
                                        focus:text-primary focus:bg-white
                                        hover:rounded-3xl hover:p-2 hover:bg-tertiary hover:text-primary
                                        mr-10 hover:bg-opacity-90 transition-all
                                        font-bold text-xl'>
                            deconnexion
                        </button>
                    </div>
                </div>
            </>
        );
    }

};
export default NavBar;
                               