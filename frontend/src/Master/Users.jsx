import Carrousel from  "../components/card.jsx"
import { useEffect, useState } from "react"
import { UserSearch } from "../components/Buscador.jsx"
import { useAdmin } from "../context/adminProvider.jsx"
import Card from "../components/true.jsx";
import Modal from "../components/Modal.jsx";
import { formatDate } from "../lib/formatDate.js";
function Users (){
    const {Users, suscription,selectedUser, getUsers}  = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    useEffect(()=>{ getUsers()},[])
    
    return <div className="relative">
        <UserSearch />
        { Users && <Carrousel /> }
        {suscription &&
            <Card  title={'Suscripción '.concat( suscription.status ) }>
                <span className=""> Plan: {(suscription.id_plan == 1) ? "mensual" : (suscription.id_plan==2)? "anual": "null"}</span>
            <br/>
            Desde: {formatDate(suscription.startDate)} <br/>
            Hasta: {formatDate(suscription.endDate)}  
        </Card>
        }
        {suscription == []  &&  <Card title={'Suscription inactiva'}>
            <button className="button" onClick={openModal} >suscribir</button>

        </Card> }
            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <h2>suscribir al usuario</h2>
            </Modal>
    </div>
}
export default Users