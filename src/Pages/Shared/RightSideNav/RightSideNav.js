import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaTwitch, FaSignOutAlt } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { AuthContext } from '../../../context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const RightSideNav = () => {
    const googleProvider = new GoogleAuthProvider()
    const { googleSignIn, user, logOut } = useContext(AuthContext)

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(res => {
                const user = res.user
                alert(`Welcome ${user.displayName}`)
            })
            .catch(er => console.error(er))
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('logout succeed')
            })
            .catch(er => console.error(er))
    }
    return (
        <div>
            <ButtonGroup vertical>
                {

                    user ? <Button variant="outline-dark" onClick={handleLogOut}> <FaSignOutAlt></FaSignOutAlt> Log Out</Button> : <>
                        <Button onClick={handleGoogleSignIn} className='mb-2' variant="outline-primary"> <FaGoogle></FaGoogle> Login with Google</Button>
                        <Button variant="outline-dark"> <FaGithub></FaGithub> Login with Github</Button>
                    </>
                }
            </ButtonGroup>
            <div className='mt-4'>
                <h5>Find us on</h5>
                <ListGroup>
                    <ListGroup.Item className='mb-2'><FaFacebook /> Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaWhatsapp /> WhatsApp</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaTwitter /> Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaTwitch /> Twitch</ListGroup.Item>
                    <ListGroup.Item className='mb-2'>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>
    );
};

export default RightSideNav;