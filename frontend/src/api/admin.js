 import axios from './axios.js'
 ///////// parte de Projects ////////
 //obtener Projects 
 export const getProjectsRequest = async () => await axios.get(`/empresas`);
 //obtener un projecto por un id
 export const getProjectRequest = async (id) => await axios.get(`/empresas/user/`.concat(id));
 // crear porjecto
 export const crearProjectRequest = async (data) => await axios.post('/empresas/', data, {headers: {'Content-Type': 'multipart/form-data'}});
// actualizar projecto
export const updateProjectRequest = async (id, data) => await axios.put('/empresas/'.concat(id), data,{headers: {'Content-Type': 'multipart/form-data'}});
//eliminar Projecto 
export const deleteProjectRequest = async (id) => await axios.delete('/empresas/'.concat(id));
 ///////// parte de Usuarios ////////
//obtener Users
export const getUsersRequets = async () => await axios.get('/users');
//obtener un usuaruio
export const getOneUserRequets = async (id) => await axios.get('/users/'.concat(id));

//buscar un usario segun name, phone y email
export const serachUsersRequets = async (search) => await axios.get('/users/search/'.concat(search));

//encontrar si el usuario esta suscristo y a cula plan esta suscrito;
export const  haveSuscriptionRequest = async (id_user) => await axios.get('/suscriptions/'.concat(id_user));
//obtener todos las suscripciones
export const  getAllSuscriptionsRequest = async () => await axios.get('/suscriptions/');
//busacr toods las sucriptions para el calendario
export const  getAllSuscripCalendarRequest = async () => await axios.get('/suscriptions/cal/');
////////Servicios////////////
export const getServicesRequest = async (id) => await axios.get('/service/'.concat(id));
export const updateServiceRequest = async (id,data) => await axios.put('/service/'.concat(id),data, {headers: {'Content-Type': 'multipart/form-data'}});
export const createServiceRequest = async (data) => await axios.post('/service/', data, {headers: {'Content-Type': 'multipart/form-data'}});
export const deleteServiceRequest = async (id) => await axios.delete('/service/'.concat(id));
///// Shedules //////
export const getSchedulesRequest = async (id) => await axios.get('/schedules/'.concat(id));
export const updateSchedulesRequest = async (id, data) => await axios.put('/schedules/'.concat(id), data);
export const createSchedulesRequest = async (data) => await axios.post('/schedules/', data);
export const  deleteSchedulesRequest = async (id) => await axios.delete('/schedules/'.concat(id));

///// appointments /////
export const deleteAppointmentRequest = async (id) => await axios.delete('/appointments/'.concat(id));
export const updateAppointmentRequest = async (id,data) => await axios.put('/appointments/'.concat(id), data );
export const createAppointmentRequest = async (data) => await axios.post('/appointments/',data);
export const getAppointmentRequest = async (id) => await axios.get('/appointments/'.concat(id));
export const getAppointmentsRequest = async () => await axios.get('/appointments/');

///// Reservation //////
export const checkAvailabilityRequest = async (data) => await axios.get('/reservation/check',data);
export const crearReservationRequest = async (data) => await axios.post('/reservation/', data) 
export const getReservationRequest = async (id) => await axios.get('/reservation/'.concat(id));
export const verificarHorarioRequest = async (data) => await axios.post('/reservation/horario/', data);
export const deleteReservationRequets = async (id) => await axios.delete('/reservation/'.concat(id));
export const updateReservationRequest = async (id,data) => await axios.put('/reservation/'.concat(id), data); 

//// citas ////
export const getCitasRequest = async (id) => await axios.get('/citas/'.concat(id));
export const updateCitasRequest = async (id, data) => await axios.put('/citas/'.concat(id), data);
export const crearCitasRequest = async ( data ) => await axios.post('/citas/', data);
export const deleteCitasRequest = async ( data ) => await axios.delete('/citas/'.concat(id), data);