import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';
import app from '../../firebase/firebase.config';

const auth = getAuth(app)

const Login = () => {

    const { loginWithEmail, setLoding } = useContext(AuthContext);
    const [error, setError] = useState()
    const navigate = useNavigate();
    const loaction = useLocation()
    const from = loaction.state?.from?.pathname || '/login'

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        console.log(auth.currentUser)

        loginWithEmail(email, password)
            .then(result => {
                const user = result.user;
                if (user.emailVarified) {
                    return navigate(from, { replace: true })
                }
                else {
                    Swal.fire('please varify your email')
                }

                form.reset();
            })
            .catch(error => setError(error.message))
            .finaly(setLoding(false))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Text className="text-danger">
                {
                    error
                }
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" required />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>

        </Form>
    );
};

export default Login;