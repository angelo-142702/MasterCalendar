import axios from './axios.js'
//obtener todaas los Servicios con un ID;
export const getServiceRequets = async (id) => await axios.get(`/service/${id}`);
