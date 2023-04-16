import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineHome, MdMovie } from "react-icons/md"
import { FiUserPlus, FiLogOut } from "react-icons/fi"
import { useAuth } from '../../hooks'


export default function Navbaradmin() {
    const {handlelogout} =useAuth()
    return (
        <nav className=" w-48 min-h-screen bg-secondary border-r-gray-300  flex flex-col justify-between ">
            <div className=' flex flex-col justify-between pl-5 h-screen sticky border-r top-0 '>
                <ul>
                    <li className=" mb-8">
                        <Link to="/">
                            <img src="./logo.png" alt="logo" />
                        </Link>
                    </li>
                    <li>
                        <Link className=' text-white flex items-center text-lg space-x-2 hover:opacity-80 ' to="/"><MdOutlineHome />
                            <span>Home</span></Link>
                    </li>
                    <li>
                        <Link className=' text-white  flex items-center text-lg space-x-2 hover:opacity-80 ' to="/Movie"><MdMovie />
                            <span>Movies</span></Link>
                    </li>
                    <li>
                        <Link className=' text-white text- flex items-center text-lg space-x-2 hover:opacity-80' to="/Actors"><FiUserPlus />
                            <span>Actors</span></Link>
                    </li>

                </ul>

                <div className=' flex flex-col items-start pb-5'>
                    <span className=' font-semibold text-white text-xl'>Admin </span>
                    <button onClick={handlelogout} className='  text-dark-subtle flex space-x-2 items-center text-sm hover:text-white transition'><FiLogOut />
                        <span>Log out</span></button>
                </div>
            </div>
        </nav>
    )
}


// const NavItem = ({ Children, to }) => {
//     return (
//         <NavLink
//             className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")} to={to}>{Children}
//         </NavLink>
//     )
// }
