import jwt from 'jsonwebtoken'
import { configKeys } from '../../frameworks/database/mongoDb/config'
import { userInterface } from '../../entities/User';


const generateToken = async(res:any,user:userInterface)=>{
    try{
        const userId=user._id
        const accessToken = jwt.sign({userId},configKeys.ACCESS_KEY,{
            expiresIn:'5m'
        });
        const refreshToken = jwt.sign({userId},configKeys.REFRESH_KEY,{
            expiresIn:'10d'
        })

        res.cookie('accessToken',accessToken,{
            httponly:true,
            secure:configKeys.NODE_ENV!=='development',
            samesite:true,
            maxAge : 5 * 60 * 1000
        
        })
        res.cookie('refreshToken',refreshToken,{
            httponly:true,
            secure:configKeys.NODE_ENV!=='development',
            samesite:true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        })
    
    }catch(error){
        console.log('error in jwt generation:',error)
    }
   

}

export default generateToken

