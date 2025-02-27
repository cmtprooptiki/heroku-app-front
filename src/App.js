import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./components/Login";
import Users from "./pages/user_pages/Users";


import AddUser from "./pages/user_pages/AddUser";
import EditUser from "./pages/user_pages/EditUser";

import AddIndicator from "./pages/indicators_pages/AddIndicator";

import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button'; // Importing PrimeReact Button component

import 'primereact/resources/themes/saga-blue/theme.css';  // theme
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
//import 'primereact/resources/primereact.min.css';          // core css
import 'primeicons/primeicons.css';                        // icons
import 'primeflex/primeflex.css';   


import './flags.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import HCProviders from "./pages/HCProviders_pages/HCProviders";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/home";
import EditSimpleUser from "./pages/user_pages/EditSimpleUser";
import HcpUser from "./pages/HcpUser";

function App() {
  const value = {
    ripple: true,
    
};
  return (
    <div>
      <PrimeReactProvider value={value}>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="indicator"><Dashboard/></ProtectedRoute>}></Route>
          {/* <Route path="/map" element={<MapPolution/>}></Route> */}

          <Route path="/users" element={<ProtectedRoute requiredRole="admin"><Users/></ProtectedRoute>}></Route>
          <Route path="/users/add" element={<ProtectedRoute requiredRole="admin"><AddUser/></ProtectedRoute>}></Route>
          <Route path="/users/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditUser/></ProtectedRoute>}></Route>

          <Route path="/simpleUser/edit/:id" element={<EditSimpleUser/>}></Route>


          <Route path="/indicators/add" element={<ProtectedRoute requiredRole="indicator"><AddIndicator/></ProtectedRoute>}></Route>

          <Route path="/hcproviders" element={<ProtectedRoute requiredRole="hcp"><HCProviders/></ProtectedRoute>}></Route>

          <Route path="/hcpUser/:id" element={<ProtectedRoute requiredRole="admin"><HcpUser/></ProtectedRoute>}></Route>

          {/* <Route path="/statistics" element={<KpisDashboard/>}></Route>

          <Route path="/reports" element={<Reports/>}></Route> */}

        </Routes>
      </BrowserRouter>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
