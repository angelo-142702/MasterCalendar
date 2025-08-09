import  { createContext, useState, useContext,useEffect } from 'react';
const AdminContext = createContext();
import { notyf } from '../lib/notyf.js';
import {notification} from 'antd'
import  {getProjectsRequest, getUsersRequets, serachUsersRequets, getProjectRequest,
    haveSuscriptionRequest,crearProjectRequest,getOneUserRequets,
    getAllSuscriptionsRequest,updateProjectRequest,deleteProjectRequest,
    getAllSuscripCalendarRequest,updateServiceRequest, createServiceRequest,getServicesRequest,
    createSchedulesRequest, updateSchedulesRequest, getSchedulesRequest,deleteAppointmentRequest,
    deleteSchedulesRequest, getAppointmentRequest, updateAppointmentRequest,createAppointmentRequest,verificarHorarioRequest,
    checkAvailabilityRequest, getAppointmentsRequest, crearReservationRequest, getReservationRequest,
    deleteReservationRequets, updateCitasRequest, deleteCitasRequest, crearCitasRequest, getCitasRequest
 } from "../api/admin.js"
import { crearRepreRequest, updateRepreRequest, getRepresRequest } from '../api/repre.js'
import { set } from 'react-hook-form';
export const useAdmin = () => {
    return useContext(AdminContext);
};
export const AdminProvider = ({ children }) => {
   const [Projects, setProjects] = useState();
   const [services, setServices] = useState();
   const [projectsAll, setProjectAll] = useState();
   const [schedules, setSchedules] = useState();
   const [appointments,setAppointments] = useState();
   const [selectedProject, setSelectedProject ] = useState();
   const [repres, setRepres ] = useState();
   const [reservations, setReservations] = useState();
   const [selectedUser, setSelectedUser ] = useState();
   const [ suscription, setSuscription ] = useState();
   const [ events, setEvents ] = useState()
   const [ suscriptions, setSuscriptionsUsers ] = useState();
   const [Users, setUsers] = useState();
   const [availability, setAvailability] = useState(null);
   const [schedulesfree, setSchedulesfree] = useState([]);
   const [loading, setLoading] = useState(false);
   const [Citas, setCitas ] = useState([]);
   const [horasLibres, sethorasLibres] = useState();
   
   const [sessionData, setSessionData] = useState(() => {
    // Puedes inicializar con un valor por defecto o cargar desde sessionStorage
    return JSON.parse(sessionStorage.getItem('projectSeleted')) || { value: null };
  });
  const updateSessionData = (newData) => {
    setSessionData(newData);
    sessionStorage.setItem('projectedSelected', JSON.stringify(newData));
  };
  
  const deleteReservation = async(id) => {
    try {
        
        const res = await deleteReservationRequets(id);
        if (res.status == 204) {    
            notyf.success('Se elimnó el registro');
            getReservation(selectedProject.id);
        }
    } catch (e) {
        console.log(e);
        notyf.error(e.responde.data.message);
    }
  }
   
  const verificarHorario = async (id,dia, date, duration) =>{
    try {
        const res = await verificarHorarioRequest({ id, dia, date, duration});
        console.log('Estos son los horarios disponibles');
        console.log(res.data.newintervalos);
        sethorasLibres(res.data.newintervalos);
        
    } catch (error) {
        console.log(error);
        sethorasLibres([error.response.data.message])
    }
  }
  const getProjectsfe = async () =>{
    try {
        const res = await getAppointmentsRequest();
        console.log(res.data);
        setProjectAll(res.data);        
    } catch (error) {
        console.log(error);
        
    }
  }
  const crearReservation = async (data) =>{
    try {
        const res = await crearReservationRequest( data);
        getReservation(selectedProject.id)
        console.log('neva reservation', res.data);
        
    } catch (error) {
        console.log(error);
        notyf.error('error en crear reservation');
        
    }
  }
  const getReservation = async (id) => {
    try {
        const res = await getReservationRequest(id);
        setReservations(res.data);
        console.log(res.data);
        
    } catch (error) {
        console.log(error);
       notyf.error('error al obtener las reservations'); 
    }
  }
  
  
  // Validar disponibilidad
    const checkAvailability = async (start, end, projectId) => {
      try {
        const response = await checkAvailabilityRequest('/reservations/check', {
          startDateTime: start,
          endDateTime: end,
          projectId
        });
        return response.data.available;
      } catch (error) {
        notification.error({ message: 'Error verificando disponibilidad' });
        return false;
      }
    };
  const fetchSchedules = async (projectId) => {
        try {
          const response = await getSchedulesRequest(projectId);
          setSchedulesfree(response.data);
          console.log('soy el horario ',response.data);
          
        } catch (error) {
          notification.error({ message: 'Error cargando horarios' });
        }
      };
      const fetchServices = async (projectId) => {
        try {
          const response = await getServicesRequest(projectId);
          setServices(response.data);
          console.log(' soy el listado de Servicios', response.data);
          
        } catch (error) {
          notyf.error('Error cargando servicios');
        }
      };
  const getAppointments = async (id) =>{
    try {
        const res = await getAppointmentRequest(id);
        console.log('cita', res.data);
        setAppointments(res.data);
    } catch (error) {
        console.log('cita', error.response.data);
        notyf.error(error.response.data.message);
    }
  }
  const updateAppointments = async (id, data) => {
    try {
        const res = await updateAppointmentRequest(id, data);
    console.log('se realizó el cambio en la cita', res.data);
    setAppointments(res.data)
    } catch (error) {
        console.log('Error al actualizar cita', error);
        notyf.error(error.response.data.message);  
    }
  }
  const createAppointments = async (data) => {
    try {
        const res = await createAppointmentRequest(data);
        console.log('error al crear la cita', res.data);
        setAppointments(res.data);
        notyf.success('se registro la cita correctamente');
        
    } catch (error) {
        console.log('Error al crear cita', error);
        notyf.error(error.response.data.message);  
    }
  }
  const deleteAppointment = async(id) => {
    try {
        const res = await deleteAppointmentRequest(id);
        console.log(res.data);
        setAppointments(res.data);
        notyf.success('se eliminó el archivo')
        
    } catch (error) {
        console.log(error);
        notyf.error('no se eliminó el archivo')
    }
  }
    // crear Project
    const crearProject = async (data) => {
        try {
            const response = await crearProjectRequest(data)
            console.log('Respuesta del servidor:', response.data);
            getProjects();
            notyf.success('Muy bien se creó el Projecto');
          } catch (error) {
            console.error('Error al enviar el formulario:', error);
            console.log(error.response.data.message);
            
            notyf.error('¡Error! '.concat(error.response.data.message));
          }
    }
    //actualizar Project
    const updateProject = async(id,data) =>{
        try {
            const res = await updateProjectRequest(id,data);
            console.log(res.data)
            getProjects();
        } catch (error) {
            console.log('fallao al actualizar el projecto',error);
            
        }
    }
     //delete Prjects
    const deleteProject = async (id) =>{
        try {
            const res = await deleteProjectRequest(id);
            console.log(res.data);
            getProjects()
        } catch (error) { console.log('error en eleimar Project', error) }       
    }
    //obtener un usario para caariable de entorno
    const getOneUser = async(id) =>{
        try {
            const res = await getOneUserRequets(id);
            console.log('usuario seleccionado', res.data);
            setSelectedUser(res.data)
            
        } catch (error) {
            console.log('error en la obtnecion de usario', error);
            
        }
    }// REPRESENTANTES FUNCTION
     const getRepres = async (id) => {
        try {
            const res= await getRepresRequest(id);
            console.log(res.data);
            setRepres(res.data)
            
        } catch (e) {
            console.log('hubo un error en la selecion de Represntantes', e);
            notyf.error('Error!',e.response.data.message);
            
        }
    }
    //crear Representante
    const crearRepre = async (data) => {
        try {
            const res = await crearRepreRequest(data);
            console.log(res.data);
            notyf.success("se agregó exitosamente un representante");
            getRepres(selectedProject.id);
            
        } catch (err) {
            console.log('error al crear Repre',err);
            
        }
    }
    //update Representante
    const updateRepre = async (id,data) => {
        try {
            const res = await updateRepreRequest(id,data);
            console.log(res.data);
            notyf.success("se actualizó con exito al representante");
            getRepres(selectedProject.id);
            
        } catch (err) {
            console.log('error al crear Repre',err);
            
        }
    }
    //crear Service
    const createService = async (data) =>{
        try {
            const res = await createServiceRequest(data);
            setServices(res.data);
            console.log(res.data);
            notyf.success('Servico registrado con exito');
            updateSessionData({ 
                value: 'nuevo valor',
                timestamp: new Date().toISOString()
              });
            getServices(sessionData.value.id)
        } catch (e) {
            console.log('hubo un error en la creacion de un servicio',e.response);
            notyf.error(e.response.data.message)
            
        }
    }
    //ACTUALIZAR SERVICIO
    const updateService = async (id,data) =>{
        try {
            const res = await updateServiceRequest(id,data);
            
            
            console.log(res.data);
            notyf.success('Servico actualizado');
            getServices(selectedProject.id);
            //getServices(sessionData.value.id)
        } catch (e) {
            console.log('hubo un error en la actualización de un servicio',e.response);
            notyf.error(e.response)
            
        }
    }
    //OBTENER sERVICIOS
    const getServices = async (id) => {
        try {
            const res = await getServicesRequest(id);
            console.log('services');
            console.log(res.data);
            setServices(res.data);
            
        } catch (er) {
            console.log('error al obtener Servios ', er);
            notyf.error(er.response)            
        }
    }
    //obtener projects plural
    const getProjects = async() =>{
        try{
            const res = await getProjectsRequest();
            console.log("me estoy activando");
            
            console.log(res.data);
            setProjects(res.data)
            return res.data
        }catch(e){
            console.log("error al utilizar el obtenmer los projects", e);
            //noty.error("error al utilizar el obtenmer los projects")
        }
    }
    const getProject =async (id) => {
        try {
            const res = await getProjectRequest(id);
            setSelectedProject(res.data);
            console.log('soy el projecto del usuario selecionado ❤', sessionData.value);
            
        } catch (error) {
            console.log('error de obtener un solo projecto', error);
            
        }
    }
    const getUsers = async() =>{
        try{
            const res = await getUsersRequets();
            setUsers(res.data)
            return res.data
        }catch(e){
            console.log("error al utilizar el obtenmer los Usuarios", e);
            //noty.error("error al utilizar el obtenmer los Usuarios")
        }
    }
     const searchUsers = async (search) => {
        try {
            const res = await serachUsersRequets(search);
            setUsers(res.data);
        } catch (error) {
            console.log('error en el buscador ...',error);
        }
     }
    const haveSuscription = async (id_user) => {
        try {
            const res = await haveSuscriptionRequest(id_user);
            if (res.data == []) {
                console.log('el usuario no titne suscripcion disponible por los momentos');
            }else{
                console.log('este es la suscription');

            }

            console.log(res.data);
            setSuscription(res.data);
        } catch (e) {
            console.log("hubo un error con encontar una susciption", e);
        }
    }
    const getAllSuscripCalendar = async () => {
        try {
            const res = await getAllSuscripCalendarRequest();
            console.log('evnets', res.data);
            setEvents(res.data);
        } catch (error) {
            console.log('problemas con las sucriptiones para el calendario', error);   
        }
    }
    const getAllSuscriptions = async () =>{
        try {
            const res = await getAllSuscriptionsRequest();
            console.log(res.data);
            setSuscriptionsUsers(res.data);
            
        } catch (error) {
            console.log('error al no traer todas las sucriptiones ', error);
            
        }
    } 
    const getSchedules = async (id) =>{
        try {
            const res = await getSchedulesRequest(id);
            console.log('soy el horario Schedule, ', res.data);
            setSchedules(res.data);
            
        } catch (error) {
            console.log('no se logro la optencion de schedules,\n', error);
            
        }
        
    }
    const createSchedule = async (data) =>{
        try {
            const res = await createSchedulesRequest(data);
            console.log('soy el horario Schedule creado, ', res.data);
            getSchedules(selectedProject.id);
            notyf.success('Secreó el horario exitosamente')
        } catch (error) {
            console.log(error);
            
        }
    }
    const updateSchedule = async (id, data) =>{
        try {
            const res = await updateSchedulesRequest(id, data);
            console.log( 'horario actualizado' ,res.data);
            getSchedules(selectedProject.id);
            notyf.success('Se actualizó el horario');
        } catch (error) {
            console.log('Erroro al actualizar el horaio',error);
            notyf.success('Se actualizó el horario');
        }
    }
    const deleteSchedule = async (id) =>{
        try {
            const res = await deleteSchedulesRequest(id);
            console.log('se eleimino el horario \n', res.data);
           notyf.open({
                   type: 'info',
                   message: 'Se eliminó el horaio',
                 });
        } catch (error) {
            console.log('error en eliminar al horario \n', error);           
        }
    }

    const crearCita = async () => {
        try {
            const res =  await crearCitasRequest(data);
            console.log('soy la cita creada');
            console.log(res.data);
            setCitas(res.data);
            notyf.success('Se creo con exito la cita');            
        } catch (error) {
            console.log(error);
            notyf.error('faló la creación de la cita')
            
        }
    }
    const updateCita = async(id, data) =>{
        try {
            const res = await updateCitasRequest(id, data);
            console.log(res.data);
            setCitas(res.data);
            notyf.success('se actualizó exitosamente los servicios');
            
        } catch (e) {
            console.log(e);
            notyf.error('error en actualizar cita')
            
        }
    }
    const deleteCita = async(id) => {
        try {
            const res = await deleteCitasRequest(id);
            console.log(res.data);
            setCitas(res.data);
        } catch (er) {
            console.log(er);
            
        }
    }
    const getCitas = async (id) => {
        try {
            const res = await getCitasRequest(id);
            console.log(res.data);
            setCitas(res.data);            
        } catch (error) {
            console.log(error);
            notyf.error('error al recibir citas')
        }
    }
    
    /* useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          if(cookies.adminToken) console.log("logueado");
          if (!cookies.token) {
            setIsAdmin(false);
            setLoading(false);
            return;
        }
        
        try {
            const res = await verifyAdminTokenRequest(cookies.adminToken);            
            if (!res.data) return setIsAdmin(false);
            setIsAdmin(true);
            setAdmin(res.data);
            setLoading(false);
          } catch (error) {
            setIsAdmin(false);
            setLoading(false);
            console.log(error);
          }
        };
        checkLogin();
      }, []); */
    return (
        <AdminContext.Provider value={{  Projects, setProjects, 
            getProjects, getUsers,Users, getOneUser,searchUsers, getProject,selectedProject,setSelectedUser, selectedUser,
            suscription, haveSuscription, suscriptions, setSuscriptionsUsers, getAllSuscriptions,events, createService,
            getAllSuscripCalendar, crearProject, updateProject,deleteProject, repres, getRepres,crearRepre, updateService,
            updateRepre,getServices,services,getSchedules,createSchedule, updateSchedule, deleteSchedule,schedules,
            appointments, getAppointments, createAppointments, updateAppointments,deleteAppointment,
            availability,loading,setLoading, fetchSchedules, schedulesfree, fetchServices, checkAvailability,
            getProjectsfe, projectsAll, crearReservation, getReservation,reservations,Citas,
            verificarHorario, horasLibres, deleteReservation, deleteCita, crearCita, updateCita, getCitas
        }}>
            {children}
        </AdminContext.Provider>
    );
};
