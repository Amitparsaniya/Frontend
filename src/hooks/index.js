import { useContext } from "react"
import { AuthContext } from "../context/Authprovider"
import { NotificationContext } from "../context/NotificationProvider"
import { SerchContext } from "../context/Serchprovider"
import { Themecontext } from "../context/Themeprovider"

export const useTheme =()=>{
    return useContext(Themecontext)
}
export const useNotification  =()=>{
    return useContext(NotificationContext)
}
export const useAuth  =()=>{
    return useContext(AuthContext)
}
export const useSearch  =()=>{
    return useContext(SerchContext)
}
