import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { signInWithEmail, varifyEmail, addInformation } = useContext(AuthContext);
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmail(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('')
                handleVarify()
                handleAddInformation(name, photo)
                form.reset();
                navigate('/login')

            })
            .catch(er => setError(er.message))

    }
    const handleVarify = () => {
        varifyEmail()
            .then(() => {
                Swal.fire('please varify your email')
                return setError('')
            })
            .catch(er => setError(er.message))

    }
    const handleAddInformation = (name, photo) => {
        const profile = { displayName: name, photoURL: photo }
        addInformation(profile)
            .then(() => {
                setError('')
                return Swal.fire('please varify your email')
            })
            .catch(er => setError(er.message))

    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Text className="text-danger text-center">
                {error}
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Your Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoto">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control name="photoURL" type="text" placeholder="Phot URL" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};

export default Register;

