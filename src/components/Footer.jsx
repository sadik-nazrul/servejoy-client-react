import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="flex flex-col lg:flex-row md:flex-row gap-4 justify-between items-center p-4 bg-slate-100 text-secondary text-lg lg:px-10 md:px-8 px-2">
            <aside className="flex gap-4 flex-col lg:flex-row md:flex-row lg:items-end items-center">
                <Link to='/'>ServeJoy</Link>
                <p className='text-center'>Copyright © 2024 - All right reserved</p>
            </aside>
            <nav className="flex gap-4 items-center">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF></FaFacebookF>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter></FaTwitter>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn></FaLinkedinIn>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;