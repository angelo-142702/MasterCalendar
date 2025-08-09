import { BrowserRouter , Route,Routes} from "react-router-dom";
import  Register  from "./pages/Reister.jsx";
import {Login} from "./pages/Login.jsx"
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home.jsx";
import { AuthProvaider } from "./context/authContext.jsx";
import { LoadingProvider } from "./context/loaderContext.jsx";
import { AdminProvider } from "./context/adminProvider.jsx";
import ProtectedRoute from "./protectedRoutes.jsx";
import { Calendar } from "antd";
import MasterStruct from "./pages/masterStruct.jsx";

function App ()  {
  return ( 
    <AdminProvider>
      <AuthProvaider>
        <LoadingProvider>
           <BrowserRouter>
              <Router></Router>
            </BrowserRouter>
        </LoadingProvider>
      </AuthProvaider>
    </AdminProvider>
  )
};
function Router () { 

  return (
      <Routes>
            <Route path="/Register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/Calendar"  element={ <Calendar/>} />
            <Route path="/Master"  element={ <MasterStruct/>} />

            
            <Route element={<ProtectedRoute />}>
              <Route path="/home"  element={ <Home/>} />
            </Route>

           
      </Routes>
  );
};

export default App;