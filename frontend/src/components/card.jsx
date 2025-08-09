import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/adminProvider.jsx"
  import "swiper/css"; // Estilos básicos de Swiper
import "../css/swiper.css"; // Archivo de estilos personalizados
import { UserSearch } from "./Buscador.jsx"; 
const Carrusel = () => {
  const { Users, getUsers, getProject,selectedProject, haveSuscription, getOneUser } = useAdmin();
  useEffect(()=>{
    getUsers();
  },[])
  // Estado para almacenar el elemento seleccionado
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);

  // Datos de ejemplo para los elementos del carrusel

  // Función para manejar la selección
  const handleSeleccion = (id) => {
    setElementoSeleccionado(id);
    getProject(id);
    haveSuscription(id);
    getOneUser(id);

    
  };

 if(Users) return (
    <div >

      <div  className="max-wid contenedor">


      
        {Users.map((elemento) => (
          <div key={elemento.id}>
            <div
              className={`cardCollection ${
                elementoSeleccionado === elemento.id ? "seleccionado" : ""
              }`}
              onClick={() => handleSeleccion(elemento.id)}
            >
              <div className="cardCollectionimg"></div>
              <div className="cardCollectiontextBox">
                <div className="cardCollectiontextContent">
                  <p className="cardCollectionh1">{elemento.name}</p>
                <p className="cardCollectionp">{elemento.email}</p>
                      <p className="cardCollectionp">{elemento.phone}</p>
                  <span className="cardCollectionspan">
                    
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      

      {/* Mostrar el elemento seleccionado */}
      <div style={{ marginTop: "20px" }}>
        {elementoSeleccionado ? (
          <div className="flex">
            <p>Elemento seleccionado: { selectedProject && selectedProject.name}</p>
            {/* <img src={selectedProject.logo} alt="" /> */}
          </div>

        ) : (
          <p>Ningún elemento seleccionado</p>
        )}
      </div>
    </div>
  );
};

export default Carrusel;