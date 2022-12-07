import Container from '../container';
import React from 'react';
import { BsFillSunFill } from 'react-icons/bs'
import Coustomlink from '../Coustomlink';
import { Link } from 'react-router-dom';
import { useAuth, useTheme } from '../../hooks';

export default function Navbar() {
    const {toggleTheme}= useTheme()
    const {authInfo,handlelogout}= useAuth()
    const {isLoggedin} = authInfo

    return (
        <div className="bg-secondary">
            <Container className="p-2">
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <img src="./logo.png" alt="" className="h-10" />
                    </Link>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <button onClick={toggleTheme} className='bg-dark-subtle p-1 rounded'>
                                <BsFillSunFill className="text-secondary" size={24} />
                            </button>
                        </li>
                        <li>
                            <input type="text" name="" className="border-2 border-dark-subtle p-1  rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                                placeholder="serch..." />
                        </li>
                        <li>
                        
                         { isLoggedin?(
                                <button onClick={handlelogout} className="text-white font-semibold text-lg" >Log out</button>
                         ):(
                         <Link className="text-white font-semibold text-lg" to="/auth/signin">login</Link>
                         )}                       
                         </li>

                    </ul>

                </div>
            </Container>
        </div>
    )
}
