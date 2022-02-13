import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../redux/usersSlice';
import { edithUsersAction } from '../../redux/users-operations';

import { Button, Modal, Form } from 'react-bootstrap';

const EditUserModal = ({ userToEdit, showEditModal, handlerCloseEditUser }) => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    city: '',
  });

  useEffect(() => {
    setNewUser({
      id: userToEdit.id,
      name: userToEdit.name,
      username: userToEdit.username,
      email: userToEdit.email,
      city: userToEdit.address && userToEdit.address.city,
    });
  }, [userToEdit]);

  const handleEditwUser = e => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      id: userToEdit.id,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(editUser({ newUser }));
      // dispatch(edithUsersAction(newUser));
      handlerCloseEditUser();
    }
    setValidated(true);
  };

  return (
    <Modal show={showEditModal} onHide={handlerCloseEditUser}>
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={e => handleEditwUser(e)}
              value={newUser.name ?? ''}
              name="name"
              type="text"
              default={userToEdit.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              Name is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={e => handleEditwUser(e)}
              value={newUser.username ?? ''}
              name="username"
              type="text"
              default={userToEdit.username}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={e => handleEditwUser(e)}
              type="email"
              value={newUser.email ?? ''}
              name="email"
              default={userToEdit.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={e => handleEditwUser(e)}
              value={(userToEdit.address && newUser.city) ?? ''}
              name="city"
              type="text"
              default={userToEdit.address && userToEdit.address.city}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handlerCloseEditUser}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
