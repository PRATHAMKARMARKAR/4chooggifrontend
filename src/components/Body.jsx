import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './LoginStudent/Login.jsx'
import Signup from './CreateAccount/Signup.jsx';
import Matches from './User/Matches.jsx';
import Onboarding from './User/Onboarding.jsx';
import Profile from './User/Profile.jsx';
import Settings from './User/Settings.jsx';
import Applicants from './Company/Applicants.jsx';
import PostJob from './Company/PostJob.jsx';
import SettingsJob from './Company/Settings.jsx';
import CompanyLayout from './Company/CompanyLayout.jsx';
import CompanyDashboard from './Company/CompanyDashboard.jsx';
const Body = () => {
    const approuter = createBrowserRouter([
        {path:"/",element:<Home/>},
       {path:"/login",element:<Login/>},
       {path:"/Signup",element:<Signup/>},
       {path:"/Matches",element:<Matches/>},
       {path:"/Onboarding",element:<Onboarding/>},
       {path:"/Profile",element:<Profile/>},
       {path:"/Settings",element:<Settings/>},
       {path:"/Applicants",element:<Applicants/>},
        {path:"/PostJob",element:<PostJob/>},
        {path:"SettingsJob",element:<SettingsJob/>},
         {path:"CompanyLayout",element:<CompanyLayout/>},
         {path:"CompanyDashboard",element:<CompanyDashboard/>}



    ])
  return (
 <div>
      <RouterProvider router={approuter} />
    </div>
  )
}

export default Body