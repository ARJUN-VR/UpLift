import { AdminDbRepository } from "../repository/adminDbrepository";
import generateAdminToken from "../services/adminJwt";


export const adminCases = (repository:ReturnType<AdminDbRepository>)=>{
    const adminSignin = async(email:string,password:string,res:any)=>{
        const admin = await repository.findByEmail(email)
        if(!admin){
            return {success:false,error:'cannot find admin'}
        }
        if(admin){
            if(password===admin.password){
                generateAdminToken(res,admin)
                return {success:true,admin}
            }else{
                return {success:false,error:'Incorrect password'}
            }
               
        }else{
            return {success:false,error:'something went wrong'}
        }
    }
   const logout =(res:any)=>{
    res.cookie('adminJwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
   }
    return {
        adminSignin,
        logout
    }
}