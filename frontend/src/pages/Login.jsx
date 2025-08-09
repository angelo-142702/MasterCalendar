import { useForm } from "react-hook-form";
/* import { Message } from "../components/message.jsx"; */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/authContext.jsx";
import * as yup from "yup"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa";
/* import { useNotyf } from '../context/notifycontext.jsx'; */
const schema = yup.object().shape({
    email: yup.string().email('El email no es válido').required('El email es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const FormLogin = () => {

    const {signin, isAuthenticated} = useAuth();
    const [ocultoPassword, setOcultoPassword] = useState(true);
    const navigate = useNavigate();
    useEffect(() =>{
        if (isAuthenticated) navigate("/home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isAuthenticated]);
    const { register, handleSubmit , formState: {errors}   } = useForm({ resolver: yupResolver(schema) });
    const [form, setform] = useState({email:"", password:""});
    const handlePassword = () => {
        setOcultoPassword(prevState => !prevState);
      };
    const handleChange = (event) => {
        const { name, value } = event.target;        
        setform(prevState => ({
            ...prevState,
            [name]: value
        }));
  };
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    
      signin(values)

}) 
    return <form className="form"  onSubmit={onSubmit}>
    <p className="title ubuntu-bold">Acceder </p>
    <p className="message">bienvenido de vuelta a nuestro sitio</p>
    {/* {  loginErrors.map((error, i) => (
          <Message error={error} key={i}  />
        ))
        } */}
        <label>
            <input {...register("email")} onChange={handleChange} value={form.email}   name="email"   type="text" className="input" />
            <span>Correo</span>
        </label>
        {errors.email && <p className="text-red-600"> el correo es necesario</p>}
        <label>
            <input {...register("password")} onChange={handleChange} value={form.password}  type={ocultoPassword ? "password": "text"} name="password"   id="password" className="input" />
            <span>Contraseña</span>
            <div onClick={handlePassword} className="oculto">
          { (ocultoPassword)?  <FaEye  />: <FaEyeSlash/>}
        </div>
        </label>
        {errors.password && <p className="text-red-600"> la contraseña es requerida</p>}
        <p className="signin">Haz olvidado tu contraseña? <span className=" text-cyan-400 cursor-[url(hand.cur),_pointer]" onClick={()=>navigate("/recuperarPassword") }>Recuperar</span> </p>
        <button  type="submit" className="submit">Envio de formulario</button>
        <p className="signin">No tienes cuenta? Ve a <span className=" text-cyan-400 cursor-[url(hand.cur),_pointer]" onClick={()=>navigate("/register") }>registrate</span> </p>
</form>
}
export const Login = () => {
    return (
        <div className="centrar ">
            <FormLogin />
           
        </div>
    )
}
