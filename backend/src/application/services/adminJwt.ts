import  Jwt  from "jsonwebtoken";
import { AdminInterface } from "../../entities/Admin";
import { configKeys } from "../../frameworks/database/mongoDb/config";


const generateAdminToken = async(res:any,admin:AdminInterface)=>{
    const Id = admin._id
    const Token = Jwt.sign({Id},configKeys.JWT_KEY,{
        expiresIn:'10d'
    });
    res.cookie('adminJwt',Token,{
        httponly:true,
        secure:configKeys.NODE_ENV!=='development',
        samesite:true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateAdminToken