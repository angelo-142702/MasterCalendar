
//import  Upload from "./upload.jsx";
import { useAdmin } from "../context/adminProvider.jsx";
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/formstyle.css"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Space, Alert, DatePicker } from 'antd';
import dayjs from 'dayjs'
import { notyf } from "../lib/notyf.js";
import { formatDate,  obtenerDiaSemana, valueInterno } from "../lib/formatDate.js";
import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // Usa date-fns para traducciones
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const CrearReservation = ({fields, rows, functionS, callback}) => {
    const [Fields, setFields] = useState();
    const {selectedProject} = useAdmin();
    console.log(fields);
    
    useEffect(()=>{
        setFields(fields)
    },[fields])
    return (
        <div class="form-container">
        <h1>Formulario de Reservación</h1>
        <form id="reservationForm">
            
            <div class="form-group">
                <label for="id">projecto</label>
                <input type="text" id="id" name="id" value={selectedProject} required/>
            </div>
            
            <div class="form-group">
                <label for="service">Tipo de servicio:</label>
                <select id="service" name="service" required>
                    <option value="">Seleccione un servicio...</option>
                    <option value="consulta">Consulta médica</option>
                    <option value="limpieza">Limpieza dental</option>
                    <option value="ortodoncia">Ortodoncia</option>
                    <option value="blanqueamiento">Blanqueamiento dental</option>
                </select>
            </div>
            <div class="form-group">
                <label for="date">Fecha de reservación:</label>
                <input type="date" id="date" name="date" required 
                       min="2023-11-01" max="2023-12-31"/>
            </div>
            <div class="form-group">
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" required/>
            </div>
            
            
            
            
            
            
            
            <div class="form-group">
                <label for="time">Hora:</label>
                <select id="time" name="time" required>
                    <option value="">Seleccione una hora...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                </select>
            </div>
            
            
            <div class="form-group">
                <button type="submit">Reservar cita</button>
            </div>
        </form>
    </div>
    )
}

export default CrearReservation;