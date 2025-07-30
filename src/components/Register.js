import React, { useState } from 'react';
import {
  Form, Button, Container, Row, Col, Alert, Spinner, InputGroup, OverlayTrigger, Tooltip, Modal,
} from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseVariant, setResponseVariant] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const validateForm = () => {
    const errors = {};

    // Name Validation
    if (!formData.name) {
      errors.name = "Name is required.";
    } else if (formData.name.length > 20) {
      errors.name = "Name cannot exceed 20 characters.";
    } else if (!/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(formData.name)) {
      errors.name = "Name can include letters, numbers, and spaces, but cannot start or end with a space.";
    }

    // Username Validation
    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (formData.username.length < 3 || formData.username.length > 12) {
      errors.username = "Username must be between 3 and 12 characters.";
    } else if (!/^(?!.*_\\s)[a-z0-9_]+$/.test(formData.username)) {
      errors.username = "Username must be lowercase, alphanumeric, underscores allowed; no underscores followed by spaces.";
    }

    // Email Validation
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9]+)*\.[a-z]{2,}$/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    // Password Validation
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,}$/.test(formData.password)) {
      errors.password = "Password must include an uppercase letter, a lowercase letter, a special character, and a number.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const response = await axios.post('http://localhost:8080/api/register', formData);
      setResponseVariant('success');
      setResponseMessage('Registration successful!');
      handleShowModal();
    } catch (error) {
      setResponseVariant('danger');
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      setResponseMessage(`Registration failed: ${errorMessage}`);
      handleShowModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="shadow p-5 rounded" style={{ backgroundColor: '#fff', maxWidth: '600px', width: '100%' }}>
        <h4 className="text-center mb-4">User Registration</h4>

        <Form onSubmit={handleSubmit}>
          {/* Name Field */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Username Field */}
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!formErrors.username}
              />
              <Form.Control.Feedback type="invalid">{formErrors.username}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaEnvelope /></InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaLock /></InputGroup.Text>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!formErrors.password}
              />
              <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Register'}
          </Button>
        </Form>

        {/* Modal for response message */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Registration Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {responseMessage && (
              <Alert variant={responseVariant} className="text-center">
                {responseMessage}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}

export default Register;