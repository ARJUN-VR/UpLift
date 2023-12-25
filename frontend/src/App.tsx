
import { BrowserRouter ,Routes,Route } from "react-router-dom"
import { UserRoutes } from "./routes/UserRoutes"
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'



function App() {


  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
<Routes>
  <Route path="/*" element={<UserRoutes/>}/>
</Routes>
</BrowserRouter>


    </>
  )
}

export default App
