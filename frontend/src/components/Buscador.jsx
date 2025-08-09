import { useState } from "react";
import { SearchOutlined } from '@ant-design/icons'
import { useAdmin } from "../context/adminProvider.jsx";
export const UserSearch = ({ users }) => {
    const { searchUsers, getUsers } = useAdmin()
    // Estado para almacenar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
  
    // Filtrar usuarios basado en el término de búsqueda
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            func.apply(this, args);
          }, delay);
        };
      };

     const handleSearch = (e) => {
       let search = e.target.value;
       setSearchTerm(search)
       if(search == ''){
        return getUsers()
       }
       searchUsers(search)       
     }
  
    return (
      <div className="flex center" >
        {/* Campo de búsqueda */}
        <SearchOutlined />

        <input
          type="text"
          placeholder="Buscar por nombre, correo o teléfono"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            fontSize: '16px',
          }}
        />
        </div>
)}