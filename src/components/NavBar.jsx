import {
    Avatar,
    Dropdown,
    DropdownAction,
    DropdownContent,
    DropdownList,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarCollapseBtn,
    NavbarContainer,
    NavbarList,
} from 'keep-react'
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThemeSwitcher from './Themeswitcher';

const NavBar = () => {
    const { user, logOut } = useAuth()
    const userLinks = <>
        <li>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                } to='/my-profile'>My Profile
            </NavLink>
        </li>
        <li>
            <button className='px-5 py-2 bg-secondary text-white rounded' onClick={logOut}>Logout</button>
        </li>
    </>
    const links = <>
        <li>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                } to='/'>Home
            </NavLink>
        </li>

        <li>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                } to='/need-volunteer'>Need Volunteer
            </NavLink>
        </li>

        <li>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                } to='/contact'>Contact Us
            </NavLink>
        </li>
    </>
    return (
        <Navbar>
            <NavbarContainer className='mx-auto'>
                <NavbarBrand>
                    <img src='' alt="keep" />
                </NavbarBrand>
                <NavbarList className='gap-5 dark:text-white'>
                    {links}
                </NavbarList>
                <div className='flex gap-4'>
                    <NavbarList className='block space-x-2'>
                        {
                            !user && <>
                                <Link to='/login' type='button' ><FaCircleUser className='dark:text-white' size={40} /></Link>
                            </>
                        }
                        {
                            user &&
                            <Dropdown placement="bottom-end">
                                <DropdownAction asChild>
                                    <Avatar className='cursor-pointer' title={user?.displayName} size="lg" shape="circle" img={user?.photoURL} />
                                </DropdownAction>
                                <DropdownContent>
                                    <DropdownList className='space-y-2'>
                                        {userLinks}
                                    </DropdownList>
                                </DropdownContent>
                            </Dropdown>
                        }
                    </NavbarList>
                    <NavbarCollapseBtn />
                    <NavbarCollapse className='dark:text-white'>
                        {links}
                    </NavbarCollapse>

                    <NavbarList>
                        <ThemeSwitcher />
                    </NavbarList>
                </div>
            </NavbarContainer>
        </Navbar>
    );
};

export default NavBar;