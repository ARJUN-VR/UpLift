import jwt from 'jsonwebtoken'
import { configKeys } from '../../frameworks/database/mongoDb/config'
import { userInterface } from '../../entities/User';


const generateToken = async(res:any,user:userInterface)=>{
    const userId=user._id
    const Token = jwt.sign({userId},configKeys.JWT_KEY,{
        expiresIn:'50s'
    });
    res.cookie('jwt',Token,{
        httponly:true,
        secure:configKeys.NODE_ENV!=='development',
        samesite:true,
        maxAge : 50 * 1000
    
    })


}

export default generateToken

