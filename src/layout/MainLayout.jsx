import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div>
            {/* Header */}
            <NavBar />
            {/* Outlet */}
            <div className="min-h-[calc(100vh-319px)] dark:bg-gray-900">
            <Outlet />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;