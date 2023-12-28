import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { LoginForm } from "../components/adminComponents/LoginForm"
import { Outlet } from "react-router-dom"

export const AdminPrivateRoutes = () => {
    const {adminInfo} = useSelector((state:RootState)=>state.adminAuth)

    return adminInfo?<Outlet/> : <LoginForm/>
}
