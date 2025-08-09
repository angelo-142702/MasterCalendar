import ReusableForm from "../components/FormR.jsx";
import { useAuth } from "../context/authContext.jsx";
const RegisterForm = () => {
  const { register }  = useAuth()
  const onSubmit = (data) => {
    register(data);
  };

  const fields = [
    {
      name: "name",
      label: "Nombre de usuario",
      validation: {
        required: "El nombre de usuario es obligatorio",
      },
    },
    {
      name: "email",
      label: "Correo electrónico",
      type: "email",
      validation: {
        required: "El correo electrónico es obligatorio",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Correo electrónico no válido",
        },
      },
    },

    {
      name: "phone",
      label: "Numero de telefono",
      type: "text",
      validation: {
        required: "La el telefono es obligatoria",
      },
    },
    {
      name: "rol",
      label: "rol del usuario",
      ype: "",
      validation: {
        required: "El rol es obligatorio",
      },
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      validation: {
        required: "La contraseña es obligatoria",
        minLength: {
          value: 6,
          message: "La contraseña debe tener al menos 6 caracteres",
        },
      },
    },
  ];

  return (
    <ReusableForm
      fields={fields}
      onSubmit={onSubmit}
      title={"registrate"}
      ButtonText="Registrarse"
    />
  );
};
const Register = () => {
    return (
        <div className="centrar">
            <RegisterForm/>

        </div>
    )
}
export default Register;