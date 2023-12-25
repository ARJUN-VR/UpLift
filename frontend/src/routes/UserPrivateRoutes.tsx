import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Navigate, Outlet } from "react-router-dom"


export const UserPrivateRoutes = () => {
  const {userInfo} = useSelector((state:RootState)=>state.auth)

  return userInfo ? <Outlet/> : <Navigate to='/login' replace/>
}
