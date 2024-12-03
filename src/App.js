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
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          {/* <Route path="/map" element={<MapPolution/>}></Route> */}

          <Route path="/users" element={<Users/>}></Route>
          <Route path="/users/add" element={<AddUser/>}></Route>
          <Route path="/users/edit/:id" element={<EditUser/>}></Route>

          <Route path="/indicators/add" element={<AddIndicator/>}></Route>



          {/* <Route path="/statistics" element={<KpisDashboard/>}></Route>

          <Route path="/reports" element={<Reports/>}></Route> */}

        </Routes>
      </BrowserRouter>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
