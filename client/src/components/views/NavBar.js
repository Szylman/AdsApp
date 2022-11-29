import {
    Nav,
    Navbar
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { getUser } from '../../redux/usersRedux';
import Search from '../features/Search';

const NavBar = () => {
    const user = useSelector(getUser);

    return(
        <Navbar bg = "dark" variant = "dark" expand ="lg" className = "rounded my-4">
            <Navbar.Brand className='px-2'>Ads.app</Navbar.Brand> 
            <Nav className='ms-auto px-2'>
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                {user!==null && (
                <>
                    <Nav.Link as={NavLink} to="/logout">Sing out</Nav.Link>
                    <Nav.Link as={NavLink} to="/ads/add">Add new</Nav.Link>
                </>
                )}
                {user===null && (
                <>
                    <Nav.Link as={NavLink} to="/login">Sing in</Nav.Link>
                    <Nav.Link as={NavLink} to="/register">Sing up</Nav.Link>
                </>
                )}
            </Nav>
            <Search />
        </Navbar>
    )
};

export default NavBar;