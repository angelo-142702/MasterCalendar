
//import  Upload from "./upload.jsx";
import { useAdmin } from "../context/adminProvider.jsx";
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/formstyle.css"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button,  DatePicker } from 'antd';
import dayjs from 'dayjs'
import { formatDate, obtenerDiaSemanaT, obtenerDiaSemana, valueInterno } from "../lib/formatDate.js";
import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // Usa date-fns para traducciones
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Extender Day.js con el plugin de formatos
dayjs.extend(customParseFormat);
registerLocale('es', es); // Registra el locale en español
function extractTimeFromISO(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const AppointmentFormX2 = ({ services, selectedProject ,libre, func, callback}) => {
  // Servicios disponibles
 const [selectedDate,setSelectedDate] = useState('');
 const { verificarHorario } = useAdmin()
 useEffect(()=>{})
  // Generar horarios de 7:00 AM a 4:00 PM
  // Estado del formulario
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });
  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    
    // Verificar si la fecha es válida (no está vacía)
    if (dateValue) {
      console.log('Fecha seleccionada:', dateValue); // Objeto Day.js válido
              const valor = dayjs(dateValue);
              console.log(valor.$d);
              
              const timeService = valueInterno(formData.service);
              const diaSemana = obtenerDiaSemanaT(valor)
              console.log(timeService);
              console.log(diaSemana);
              
              
              verificarHorario(selectedProject, diaSemana, dateValue, timeService[0]);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      date: selectedDate
    });
    
    let form = formData;
    form.date = selectedDate;
    form.id = selectedProject
    console.log('------',form);
    console.log('Datos del formulario:', form);
    //envio de datos
    func(form);
    // Aquí iría la lógica para enviar los datos al servidor
    alert('Cita agendada correctamente');
    callback()
  };

  return (
    <div className="form-container">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo de selección de servicio */}
        <div className="form-group">
          <label htmlFor="service">Servicio:</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
          >
            <option value={''}>Seleccione un servicio</option>
           {services?.map((service, index) => (
  <option key={index} value={service}>
    {service} 
  </option>
))}
          </select>
        </div>

        {/* Campo de fecha */}
        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </div>

        {/* Campo de horario */}
        <div className="form-group">
          <label htmlFor="time">Horario:</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un horario</option>
            { libre && libre.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
          </select>
        </div>

        {/* Campo de nombre */}
        <div className="form-group">
          <label htmlFor="name">Nombre completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo de email */}
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo de teléfono */}
        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Botón de enviar */}
        <button type="submit" className="submit-btn">
          Agendar Cita
        </button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input, select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .submit-btn {
          width: 100%;
          padding: 10px;
          background-color:rgb(24, 84, 196);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .submit-btn:hover {
          background-color:rgb(17, 123, 209);
        }
      `}</style>
    </div>
  );
};

export const FormAppointment = ({ fields, row, functionS, callback, isEditMode, title }) => {
  const { selectedProject ,verificarHorario, loading } = useAdmin();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [service, setService] = useState();
  const [date, setDate] = useState(dayjs());
  let valorDefecto
  const Fields = fields;
    useEffect(()=>{
      if (isEditMode) {
          
           valorDefecto = `${extractTimeFromISO(row.startDateTime)} - ${extractTimeFromISO(row.endDateTime)}`
          console.log(valorDefecto);
          console.log(row);
          console.log();
          
          console.log('valor con defecto');
          
        }
        if (!isEditMode) {
          valorDefecto = 'por favor escoja una fecha'
        }
    },[])
        console.log(Fields);
        
  useEffect(() => {
    if (row) {
      setDate(dayjs(row.startDateTime))
      Object.entries(row).forEach(([key, value]) => {
        setValue(key, value);
      });
      console.log(fields);
      
    }
  }, [row, setValue]);
      

  const onSubmit = async (data) => {
    
    console.log('soy el data sdsdas',data);
      data.startDateTime = date
    try {
      await functionS({
        ...data,
        id_project: data.id
      });
      
      
      callback();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {Fields.map((field) => (
        
        
        <div key={field.name}  hidden={field.name=='id'}className="form-group">
          <label>{field.label}</label>
          
          {field.type === 'select' && field.name === 'service' ? (
  <select
      {...register(field.name, field.validation)}
       onChange={(e) => {
      // Actualiza el estado local
        setService(e.target.value);
      // Actualiza el estado de react-hook-form
         //field.validation?.onChange?.(e); // Si hay validaciones personalizadas
         }}
        disabled={isEditMode && field.name === 'date'}
  >
    {field.options.map(option => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
): (field.type === 'select'  && field.name === 'schedule') ? (
            <select
              {...register(field.name, field.validation)}
              value={isEditMode ?  valorDefecto : ''}
              disabled={isEditMode && field.name === 'date'}
            > 
               { field.options && field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
              
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              {...register(field.name, field.validation)}
              rows={4}
            />
          ) :   (field.type === 'datetime-local' ) ? (
            <DatePicker
            value={date}
           format="DD-MM-YYYY"
           locale="es"
            onChange={(date, dateString) => {
              console.log('Fecha', dateString); // 12/05/2025;
              const diaSemana = obtenerDiaSemana(dateString);
              console.log('Objeto Day.js:', date); // Objeto Day.js válido
              setDate(date)
              const timeService = valueInterno(service);
              verificarHorario(selectedProject.id, diaSemana, dateString, timeService[0]);

            }}
          />
          )
          :(
            <input
            {...register(field.name, field.validation)}
            type={field.type || 'text'}
            hidden={field.name == 'id'}
            id={field.name}
            name={field.name}
            
            /* hidden={ ( block && field.name == block) ? true : false } */
            className={`form-control ${field.error ? 'is-invalid' : ''}`}
            defaultValue={isEditMode ? row[field.name] : field.defaultValue || ''}
            placeholder={field.placeholder}
          />
          )
          }

          {errors[field.name] && (
            <span className="error-message">{errors[field.name].message}</span>
          )}

          {/* {field.name === 'date' && (
            <div className="availability-status">
              {availability.available ? (
                notyf.success('se activó el asunto')
              ) : (
                notyf.error('no se puede es día')
              )}
            </div>
          )} */}
        </div>
      ))}

      <div className="form-actions">
        <Button
          type="primary"
          htmlType="submit"
          
          loading={loading}
        >
          {isEditMode ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};
export const FormFinaly = ({callback, }) =>{
  return 
}
export const ProjectForm = ({ callback, onSubmit, title, finaly}) => {
  const {selectedUser} = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    id_user: selectedUser.id,
    id_category: 1,
    logo: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'logo') {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log({ ...formData, [e.target.name]: e.target.value });
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(data);
    
    onSubmit(data);
    finaly();
    callback();

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title} Form</h2>
      <div className="form-group">
<label htmlFor="name">Nombre</label>
      <input className="form-control" type="text" name="name" placeholder="Nombre" onChange={handleChange} />
      <label htmlFor="description">description</label>
      <input className="form-control" type="text" name="description" placeholder="Descripción" onChange={handleChange} />
      <label htmlFor="address">address</label>
      <input className="form-control" type="text" name="address" placeholder="Dirección" onChange={handleChange} />
      <label htmlFor="phone">phone</label>
      <input className="form-control" type="text" name="phone" placeholder="Teléfono" onChange={handleChange} />
      <label htmlFor="id_User">id_User</label>
      <input className="form-control" type="text" name="id_user" value={selectedUser.id} placeholder="ID Usuario" onChange={handleChange} />
      <label for="id_category">Sseleciona la categoria</label>
    <select onChange={handleChange} className="form-control" id="id_category" name="id_category">
        <option value="1">Refrigeración</option>
        <option value="2">Barbería</option>
        <option value="3">Odontología</option>
        <option value="4">Peluquería</option>
        <option value="5">Manicure</option>
        <option value="6">Taller mecánico</option>
    </select>
      <label htmlFor="logo">logo</label>
      <input className="form-control" type="file" name="logo" onChange={handleChange} />
      
      <button disabled={selectedUser ? false : true} className="btn btn-primary " type="submit">Enviar</button>
      </div>
    </form>
  );
};
export const ProjectEditForm = ({ row, callback,title ,update}) => {
  const [name, setName] = useState(row ? row.name : '');
  const [description, setDescription] = useState(row ? row.description : '');
  const [address, setAddress] = useState(row ? row.address : '');
  const [phone, setPhone] = useState(row ? row.phone : '');
  const [logo, setLogo] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('phone', phone);
    if (logo) formData.append('logo', logo);
    update(row.id, formData)
    callback();
  };
  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <label htmlFor="name">name</label>
    <input className="form-control"type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
      <label htmlFor="description">description</label>
    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" required />
      <label htmlFor="address">address</label>
    <input className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección" required />
      <label htmlFor="phone">phone</label>
    <input className="form-control" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" required />
      <label htmlFor="logo">logo</label>
    <input className="form-control" type="file" onChange={(e) => setLogo(e.target.files[0])} />
    <button className="btn btn-primary" type="submit">Guardar</button>
  </form>
  );
};

export  const FormN = ({ block, row, fields, functionS, buttonText, title, callback, isEditMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name);
    });
    console.log(data);
    if (isEditMode) {
      console.log('refresco', row.id, data);
       functionS(row.id, data);
       if (callback) callback();
       navigate(location.pathname, { 
        replace: true,
        state: { forceRefresh: Date.now() } // Agrega un estado único
      });
       return
    }
    functionS(data);
    if (callback) callback();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          {field.label && <label  htmlFor={field.name}>{field.label}</label> }
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              className={`form-control ${field.error ? 'is-invalid' : ''}`}
              defaultValue={isEditMode ? row[field.name] : field.defaultValue || ''}
            >
              <option value="">Seleccione una opción</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              className={`form-control ${field.error ? 'is-invalid' : ''}`}
              defaultValue={isEditMode ? row[field.name] : field.defaultValue || ''}
              placeholder={field.placeholder}
              rows={field.rows || 3}
            />
          ) : field.type === 'file' ? (
            <div>
              <input
                type="file"
                accept="image/*"
                id={field.name}
                name={field.name}
                className={`form-control ${field.error ? 'is-invalid' : ''}`}
              />
              {isEditMode && row[field.name] && (
                <div id="imageContainer">
                  <img
                    id="uploadedImage"
                    src={row[field.name]} // Mostrar la imagen actual en modo edición
                    alt="Imagen subida"
                    style={{ maxWidth: '100%', marginTop: '10px' }}
                  />
                </div>
              )}
            </div>
          ) : (
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              hidden={ ( block && field.name == block) ? true : false }
              className={`form-control ${field.error ? 'is-invalid' : ''}`}
              defaultValue={isEditMode ? row[field.name] : field.defaultValue || ''}
              placeholder={field.placeholder}
            />
          )}
          {field.error && <div className="invalid-feedback">{field.error}</div>}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        {buttonText || 'Enviar'}
      </button>
    </form>
  );
};

const ReusableForm = ({ fields, onSubmit, ButtonText, title  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">{title}</h2>
      {fields.map((field) => (
        
          <label key={field.name} htmlFor={field.name}>

          <input className="input"
            type={field.type || "text"}
            id={field.name}
            {...register(field.name, field.validation)}
            />
            <span>{field.name}</span>
          {errors[field.name] && (
            <span className="error">{errors[field.name].message}</span>
          )}
          </label>
      ))}
      <button className="submit" type="submit">{ButtonText}</button>
    </form>
  );
};



/* export const ProjectForm = () => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Aquí puedes manejar la lógica de envío del formulario
  };

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="fecha"
        label="Selecciona una fecha"
        rules={[{ required: true, message: 'Por favor selecciona una fecha!' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="imagen"
        label="Sube una imagen"
        rules={[{ required: true, message: 'Por favor sube una imagen!' }]}
      >
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onFileChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && '+ Subir'}
          </Upload>
        </ImgCrop>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}; */



export default ReusableForm;