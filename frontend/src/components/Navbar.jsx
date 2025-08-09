import styled from 'styled-components';
import { NavLink ,useLocation} from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
const Navbar = () => { 
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    let  nameL= location.pathname;
    let disable =  nameL == "/admin" ||nameL == "/vamos"|| nameL === "/admin/login" || nameL === "/home"|| nameL === "/admin/register";
    return ( 
    <StyledWrapper>

    
    <nav className={(disable)? 'pt-1 justify-around hidden': 'pt-1 flex justify-around'}> 
        <div className='w-6 h-6 bg-white rounded-full'>

        </div>
        <ul> 
            <li> 
                <NavLink  to="/home"  activeClassName="active">Home</NavLink> 
            </li>
             <li>
                <NavLink  to="/calendar" activeClassName="active">calendario</NavLink>
            </li> 
            <li>
                <NavLink to="/add-event" activeClassName="active">agendar</NavLink> 
            </li>
            <li>
                <NavLink to="/profile" activeClassName="active">perfil</NavLink> 
            </li>
                {!isAuthenticated ? <li><NavLink to="/register" activeClassName="active">Sigin</NavLink>
            </li> : ''}
            {isAuthenticated ? 
            <li><NavLink to="/home" onClick={() => logout()} > logout</NavLink></li> :
             <li> <NavLink to={"/login"} activeClassName="active">login</NavLink>   </li>}
            
            </ul>

            </nav> 
    </StyledWrapper>
    );
};
const StyledWrapper = styled.div`
nav {
position: absolute;
z-index: 1000;
top:0
}
a{
    text-decoration: none
    }
    nav ul {
        text-decoration: none;
        color:white;
    list-style-type: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin-right: 10px;
    list-style-type: none;

}

.active {
    font-weight: bold;
    color: white;
    padding:5px;
    border-bottom: white 3px solid ;
}
`
            
            
export default Navbar;