import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_JWT = process.env.SECRET_JWT;
// console.log(SECRET_JWT)

const checkLogin = async (req, res, next) => {
    const  token  = req.cookies.token;
    console.log(token)
       
       try{
           if (!token) return res.status(400).json(  { isLogined: false, message: "token not found!" });
    //    console.log(token)
           const userToken = jwt.verify(token, SECRET_JWT);
          req.user = userToken;
           
           next();
   
       } catch(err) {
           console.log("error", err);
           res.status(500).json({ message: "server error" });
       }

}

export default checkLogin;