import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider';
import { Image } from 'react-bootstrap';
import { FaUser, FaUserAlt } from 'react-icons/fa';

const Header = () => {

    const { user } = useContext(AuthContext)

    console.log(user);
    return (
        <Navbar collapseOnSelect className='mb-4' expand="lg" bg="light" variant="light">
            <Container>
                <Link to='/'>
                    <Navbar.Brand >Dragon News</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">  <Link to='/'>All News</Link></Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav className='d-felx justify-content-center align-items-center'>
                        <Nav.Link href="#deets">{user ? user.displayName : <></>}</Nav.Link>
                        <Image roundedCircle style={{ height: '60px' }} src={user && user.photoURL}>

                        </Image>
                    </Nav>
                    <div className='d-lg-none'>
                        <LeftSideNav></LeftSideNav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default Header;