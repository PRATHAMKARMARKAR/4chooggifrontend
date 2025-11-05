import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './LoginStudent/Login.jsx'
import Signup from './CreateAccount/Signup.jsx';
import Matches from './User/Matches.jsx';
import Onboarding from './User/Onboarding.jsx';
import Profile from './User/Profile.jsx';
const Body = () => {
    const approuter = createBrowserRouter([
        {path:"/",element:<Home/>},
       {path:"/login",element:<Login/>},
       {path:"/Signup",element:<Signup/>},
       {path:"/Matches",element:<Matches/>},
       {path:"/Onboarding",element:<Onboarding/>},
       {path:"/Profile",element:<Profile/>},


    ])
  return (
 <div>
      <RouterProvider router={approuter} />
    </div>
  )
}

export default Body