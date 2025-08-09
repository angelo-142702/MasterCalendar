import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "autorizacion denegada"});
  jwt.verify(token, TOKEN_SECRET, (err, user) =>{
    if (err) return res.status(401).json({ message: "token invalido" })
      console.log(user);
      req.user = user
      next();     
  });
   
};
export const authAdmin = (req, res, next) => {
  
    const { adminToken } = req.cookies;
    if (!adminToken) return res.status(401).json({ message: "autorizacion de admin es denegada"});
  jwt.verify(adminToken, TOKEN_SECRET, (err, admin) =>{
    if (err) return res.status(401).json({ message: "adminToken invalido" })
      console.log(admin);
      req.user = admin
      next();     
  });
   
};