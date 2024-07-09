import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


const MainLayout = () => {
    return (
        <div>
            {/* Header */}
            <NavBar />
            {/* Outlet */}
            <Outlet />

            {/* Footer */}
        </div>
    );
};

export default MainLayout;