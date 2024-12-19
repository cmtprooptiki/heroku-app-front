import React from 'react';
import Navbar from '../components/Navbar';
import { SidebarNew } from '../components/SidebarNew';
import HeadlessDemo from '../components/HeadlessDemo';
const Layout = ({children}) => {
  return (
    <React.Fragment>
        <div style={{paddingLeft:'39px',paddingRight:'39px',paddingTop:'30px'}}> 

        <Navbar/>
        </div>
        <div className="columns mt-6 " style={{minHeight:"100vh",backgroundColor:"rgba(248, 249, 252, 1)" ,paddingLeft:'39px',paddingRight:'39px',paddingTop:'30px'}}>
            {/* <div className="column is-one-fifth"> */}
                {/* <Sidebar/> */}
                {/* <SidebarNew/> */}
                {/* <HeadlessDemo/> */}

            {/* </div> */}
            <div className="column" style={{backgroundColor:"rgba(248, 249, 252, 1)"}}>
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout