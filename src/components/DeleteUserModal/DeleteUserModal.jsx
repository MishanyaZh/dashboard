import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/usersSlice';
import { deletehUsersAction } from '../../redux/users-operations';
import { Button, Modal } from 'react-bootstrap';

const DeleteUserModal = ({
  idToDelete,
  showDeleteModal,
  handlerDeletingUser,
}) => {
  const dispatch = useDispatch();
  const handleDeleteUser = id => {
    dispatch(deletehUsersAction({ id }));
    // dispatch(deleteUser({ id }));
    handlerDeletingUser();
  };

  return (
    <Modal show={showDeleteModal} onHide={handlerDeletingUser}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure to delete this user?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handlerDeletingUser} variant="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleDeleteUser(idToDelete)} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
