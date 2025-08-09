import axios from './axios.js'

export const getRepresRequest = async(id) => await axios.get('/repre/'.concat(id));
//crear respresentante
export const  crearRepreRequest = async (data) => await axios.post('/repre/', data);
export const  updateRepreRequest = async (id,data) => await axios.put('/repre/'.concat(id), data);

export const deleterepreRequest = async (id) => await axios.delete('/repre/'.concat(id));