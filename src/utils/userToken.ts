
import httpStatus from "http-status-codes"
import { generateToken, verifyToken } from "./jwt"
import { envVars } from "../config/envConfig"
import { IUser } from "../app/module/user/user.interface"
import User from "../app/module/user/user.model"
import AppError from "../errors/AppError"

export const createUserTokens = (user:Partial<IUser>)=>{
    const jwtPayload = {
            userId: user._id,
            email: user.email,
            role: user.role
        }
        const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)

        const refreshToken = generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET,envVars.JWT_REFRESH_SECRET_EXPIRED)

        return {
            accessToken,
            refreshToken
        }
}

export const createNewAccessTokenWithRefreshToken=async(refreshToken:string)=>{
 

const verifiedToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET);

  const isUserExist = await User.findOne(({email:verifiedToken.email}))




      

    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,'User Not Exist')
    }

    if (isUserExist.isVerified === false) {

                throw new AppError(httpStatus.BAD_REQUEST,'User is not verified')
    }
   
   

       const jwtPayload = {
            userId: isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role
        }
        const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)

        
 return{
   accessToken:accessToken,

 }

}