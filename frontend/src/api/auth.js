import axios from './axios.js'

export const resgisterRequest = async(user) => await axios.post(`/register`, user)

export  const loginRequest = async(user) => await axios.post(`/login`, user);

export const verifyTokenRequest = async () => await axios.get(`/verify`);
export const requestRestartPwd = async (password, id) => await axios.post(`/restartPwd/${id}`, password);
export const requestRecoveryPwd = async (email) => await axios.post(`/recovery`, email);
export const deleteUserRequest = async (id) => await axios.delete(`/usuarios/${id}`);
export const filterUsers = async (query) => await axios.get(`/search?query=${query}`);
export const setAllUsersRequest = async () => await axios.get("/all-users");

export const deleteTaskRequets = async (id) =>  await axios.delete(`/admin/task/${id}`);

export const verifyAdminTokenRequest = async () => await axios.get(`/adminVerify`);

export const resgisterAdminRequest = async (user) => await axios.post(`/registerAdmin`, user);
export const loginAdminRequest = async (user) => await axios.post(`/loginAdmin`, user);