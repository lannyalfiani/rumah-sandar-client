import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitLoginVolunteer } from '../redux/user';
import {toast} from 'react-toastify'
import {unwrapResult} from '@reduxjs/toolkit'

const LoginVolunteer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  function changeHandler(e) {
    e.preventDefault();

    let data = e.target.name;
    let value = e.target.value;

    let newLoginForm = {
      ...loginForm,
    };

    newLoginForm[data] = value;
    setLoginForm(newLoginForm);
  }

  async function submitHandler(e) {
      e.preventDefault();

      dispatch(submitLoginVolunteer(loginForm))
      .unwrap()
      .then((result) => {
        return toast("Akun kamu berhasil masuk!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .then(() => navigate("/"))
      .catch((error) => {
        return toast.error(`${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  return (
    <Container>
      <Card className='shadow' style={{ marginTop: "150px", borderRadius: "20px" }}>
        <Card.Body>
          <h3 className="text-center">Masuk</h3>
          <Form onSubmit={submitHandler} style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Alamat Email</Form.Label>
              <Form.Control type="email" placeholder="Masukan alamat email" name="email" value={loginForm.email} onChange={changeHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Kata Sandi</Form.Label>
              <Form.Control type="password" placeholder="Masukan kata sandi" name="password" value={loginForm.password} onChange={changeHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
            <Button className="me-3" variant="secondary" type="submit" onClick={() => navigate('/')}>
              Back
            </Button>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginVolunteer;
