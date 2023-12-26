
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from '../components/adminComponents/LoginForm'
import { AdminHome } from '../pages/adminPages/AdminHome'

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/home' element={<AdminHome/>}/>
    </Routes>
  )
}
