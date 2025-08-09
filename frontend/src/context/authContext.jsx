import { createContext ,useState, useContext, useEffect} from "react";
import { resgisterRequest ,  loginRequest ,verifyTokenRequest, 
    requestRestartPwd ,requestRecoveryPwd } from "../api/auth.js";
import Cookies from "js-cookie";
const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be use whith Provider");
        
    }else{
        return context
    }
}

// eslint-disable-next-line react/prop-types
export const AuthProvaider = ({children}) => {
    const [user, setUser]  = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registerError, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const register = async (user) =>{
        try {
            const res = await resgisterRequest(user);
            console.log(" resultado de la peticion", res.data)
            setUser(res.data) 
            setIsAuthenticated(true) 
            
        } catch (error) {
            console.log("error de registro:  ", error.response.data);
            setErrors([error.response.data])
        }
    }
    const revoveryPassword = async (email) => {
        try{
            const res = await requestRecoveryPwd(email);
            if (res.status == 400 ) {
                let text = await res.json();
            }
        }
        catch(e){
            console.log("hubo un pequeño error con en envio de recuperacion pwd:  ", e);           
        }
    }
    const restartPwd = async (password, id) => {
        try{
            const res = await requestRestartPwd({ password: password }, id);
            console.log(res);
            
            
        }catch(e){
            console.log("lanzamiento de actualizacion de contraseña ", e);
            
        }

    }
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      };
    const signin = async (user ) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            const token = res.data.token;
            console.log("soy el token ", token );
            document.cookie= `token=${token}; path=/; max-age=3600; Secure; SameSite=Strict` 
             
            setUser(res.data);
            
            setIsAuthenticated(true);
            console.log( "estas autenticado",isAuthenticated);
            
        } catch (error) {
            console.log( "no estas authenticado autenticado",isAuthenticated);
            console.log(error);
            // setErrors(error.response.data.message);
            setErrors([error.response.data]);
          }
    }
    useEffect(()=>{
        if(registerError.length > 0 ){
            const timer = setTimeout(()=> setErrors([]), 5000)
            return () => clearTimeout(timer)            
        }
    }
    ,[registerError])

    useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          console.log("me estoy activando");
          
          if(cookies.token) console.log(cookies.token);
          console.log('el admin esta autenticado');
          
          if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            console.log("no existe la token");
            return;
        }
        
        try {
            const res = await verifyTokenRequest(cookies.token);
            console.log("estoy conparando");
            
            console.log(res.data);
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
            console.log(error);
            
          }
        };
        checkLogin();
      }, []);
    return(
        <AuthContext.Provider value={{register,signin,revoveryPassword, restartPwd, registerError,logout, loading, setLoading, user, isAuthenticated}} >
        {children}
        </AuthContext.Provider>
    )
    
}