import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Contact from "../pages/Contact";
import NeedVolunteer from "../pages/NeedVolunteer";
import NeedVolunteersDetails from "../pages/NeedVolunteersDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/need-volunteers',
                element: <NeedVolunteer />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/needvolunteer/:id',
                element: <NeedVolunteersDetails />,
                loader: ({params}) => fetch(`https://servejoy-server.vercel.app/needvolunteers/${params.id}`)
            }
        ]
    }
])

export default router