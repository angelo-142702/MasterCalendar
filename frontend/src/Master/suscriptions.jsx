import { useState } from "react";
import { EditOutlined , DeleteOutlined  } from "@ant-design/icons";
import  Table  from "../components/Table.jsx";
import ModalComponent from "../components/Modal.jsx";
import { Button }from"antd";
import { FormN as Form, ProjectForm} from "../components/FormR.jsx";
import "../css/table.css"
import { useAdmin } from "../context/adminProvider.jsx";
import { useEffect } from "react";
import { formatDate } from "../lib/formatDate.js";

const TableSuscriptions = () => {
    // Definir los encabezados de la tabla
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { suscriptions , getAllSuscriptions} = useAdmin();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const headers = ['id','user','plan','startDate','endDate','status', 'actions'];
     useEffect(() => {
    getAllSuscriptions();
    },[]);
    let rows; 
    // Definir las filas de la tabla
    if (suscriptions){
      rows =  suscriptions.map(e => [
        e.id,
        e.userName,
        e.planName,
        formatDate(e.startDate),
        formatDate(e.endDate),
        e.status,
        <div key={e.id}s>
          <Button onClick={openModal}>
            <EditOutlined />
          </Button>
        </div>
        
      ])
      
      console.log(rows);
      
    }

    if (rows) return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex  justify-between"> 
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tabla de Suscriptions</h1>
        <Button className="primary" onClick={()=> openModal()}> agregar</Button>
        </div>
         <Table headers={headers} rows={rows} />
         <ModalComponent isOpen={isModalOpen} onClose={closeModal} >
            hola
         </ModalComponent> 
      </div>
    );
  };
  const Suscriptions = () =>{

    return(
      <div className="center flex flex-col">
        <TableSuscriptions />
      </div>
    )
  }
  export default Suscriptions;