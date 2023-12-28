
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from '../components/adminComponents/LoginForm'
import { AdminHome } from '../pages/adminPages/AdminHome'
import { AdminPrivateRoutes } from './AdminPrivateRoutes'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<AdminPrivateRoutes/>}>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/home' element={<AdminHome/>}/>
        <Route path='/users' element={<AdminHome/>}/>
      </Route>
        
    </Routes>
  )
}
