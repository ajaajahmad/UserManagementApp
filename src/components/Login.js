import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { loginUser } from '../services/api';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      alert(response);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Container className="form-container mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <div className="p-5 shadow rounded">
            <h4 className="mb-4 text-center">User Login</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </InputGroup>
              </Form.Group>
              <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                  <Button variant="primary" type="submit" className="mt-3 w-100">
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;