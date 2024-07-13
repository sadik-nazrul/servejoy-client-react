import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Contact from "../pages/Contact";
import NeedVolunteer from "../pages/NeedVolunteer";
import NeedVolunteersDetails from "../pages/NeedVolunteersDetails";
import AddVolunteerAnnounce from "../pages/AddVolunteerAnnounce";
import ManageMyPost from "../pages/ManageMyPost";
import UpdateVolunteerAnnounce from "../pages/UpdateVolunteerAnnounce";
import Requesrted from "../pages/Requesrted";
import MyRequest from "../pages/MyRequest";

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
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/needvolunteer/${params.id}`)
            },
            {
                path: '/addvolunteerannounce',
                element: <AddVolunteerAnnounce />
            },
            {
                path: '/updatevolunteerannounce/:id',
                element: <UpdateVolunteerAnnounce />,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/needvolunteer/${params.id}`)
            },
            {
                path: '/manage-my-post',
                element: <ManageMyPost />
            },
            {
                path: '/requested',
                element: <Requesrted /> 
            },
            {
                path: '/my-request',
                element: <MyRequest /> 
            }
        ]
    }
])

export default router