import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignUp } from "../pages/SignUp";
import { Activation } from "../pages/Activation";
import { Home } from "../pages/Home";
import { User } from "../pages/User";
import { Login } from "../pages/Login";


export default  createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {
                path:"/",
                index: true,
                Component: Home,
            },
            {
                path:"/signup",
                Component:SignUp
            },
            {
                path: "/activation/:token",
                Component: Activation
            },
            {
                path: "/user/:id",
                Component: User
            },

            {
                path: "/login",
                Component: Login
        }
        ]
    }
  ])