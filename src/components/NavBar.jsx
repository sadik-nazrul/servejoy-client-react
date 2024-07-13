import {
    Avatar,
    Dropdown,
    DropdownAction,
    DropdownContent,
    DropdownItem,
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
import { SignOut } from 'phosphor-react';

const NavBar = () => {
    const { user, logOut } = useAuth()
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
                } to='/need-volunteers'>Need Volunteer
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
        <Navbar className='dark:bg-gray-900 sticky top-0 bg-white shadow z-50'>
            <NavbarContainer className='mx-auto'>
                <NavbarBrand>
                    <h2>ServeJoy</h2>
                </NavbarBrand>
                <NavbarList className='gap-5 dark:text-white'>
                    {links}
                </NavbarList>
                <div className='flex gap-4'>
                    <NavbarList className='block space-x-2'>
                        {
                            !user && <>
                                <Link title='Login' to='/login' type='button' ><FaCircleUser className='dark:text-white' size={40} /></Link>
                            </>
                        }
                        {
                            user &&
                            <Dropdown trigger="hover" placement="bottom-end">
                                <DropdownAction asChild>
                                    <Avatar className='cursor-pointer' title={user?.displayName} size="lg" shape="circle" img={user?.photoURL} />
                                </DropdownAction>
                                <DropdownContent>
                                    <DropdownList className='space-y-2'>
                                        <DropdownItem>
                                            <NavLink to='/addvolunteerannounce' className={({ isActive }) =>
                                                isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                                            }>Add Volunteer Post</NavLink>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <NavLink to='/manage-my-post' className={({ isActive }) =>
                                                isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                                            }>Manage My Post</NavLink>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <NavLink to='/my-request' className={({ isActive }) =>
                                                isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                                            }>My Request</NavLink>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <NavLink to='/requested' className={({ isActive }) =>
                                                isActive ? 'bg-secondary px-5 py-2 rounded text-white' : ''
                                            }>Requested</NavLink>
                                        </DropdownItem>
                                        <DropdownItem onClick={logOut}>
                                            <SignOut size={20} />
                                            Logout
                                        </DropdownItem>
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