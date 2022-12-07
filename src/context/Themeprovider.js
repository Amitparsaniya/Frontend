import React from 'react'
import { useEffect } from 'react'
import { createContext } from "react"

export const Themecontext =createContext()

const defaultTheme ='light'
const darkTheme = 'dark'

export default function Themeprovider({children}) {
    const  toggleTheme = ()=>{
      const oldtheme=  localStorage.getItem('theme')
        const newtheme = oldtheme===defaultTheme? darkTheme:defaultTheme
        document.documentElement.classList.remove(oldtheme)
        document.documentElement.classList.add(newtheme)

        localStorage.setItem('theme',newtheme)
    }
    
    useEffect(()=>{
        const theme= localStorage.getItem('theme')

        // console.log(theme +"  abcd");
        if(!theme) document.documentElement.classList.add(defaultTheme)
      else  document.documentElement.classList.add(theme)

    },[])

  return (
    <Themecontext.Provider value={{ toggleTheme}}>
        {children}
    </Themecontext.Provider>
  )
}

// const getTheme =()=>{
//   // return localStorage.getItem('theme')
// }

// const updateTheme = (theme, themeToRemove)=>{
//   if(themeToRemove)  document.documentElement.classList.remove(oldtheme)

// }