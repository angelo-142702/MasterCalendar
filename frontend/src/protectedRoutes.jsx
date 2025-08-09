
//import { useAdmin } from "./context/adminContext.jsx" ;
import { useAuth } from "./context/authContext.jsx" ;
import Loader from "./components/loading.jsx"
import { Navigate, Outlet } from "react-router-dom"
export  function ProtectedRoutes(){
 const { loading, isAuthenticated} = useAuth();
   { if (loading) return <Loader></Loader>
        
     }
    if (!loading  && !isAuthenticated) return <Navigate to="/login" replace />
    return(
    <Outlet />
    
 ) 
}
export  function ProtectedAdminRoutes(){
 const { loading, isAdmin} = useAdmin();
   { if (loading) return <Loader></Loader>
        
     }
    if (!loading  && !isAdmin) return <Navigate to="/admin/login" replace />
    return(
    <Outlet />
    
 ) 
}

export default ProtectedRoutes;