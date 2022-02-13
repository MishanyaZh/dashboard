import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  statusError,
  selectUsersData,
  selectUsersStatus,
} from '../../redux/usersSlice';

import EditUserModal from '../EditUserModal/EditUserModal';
import DeleteUserModal from '../DeleteUserModal/DeleteUserModal';
import { Table, Button, Alert } from 'react-bootstrap';

const UsersList = () => {
  const users = useSelector(selectUsersData);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(statusError);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [userToEdit, setUserToEdit] = useState('');

  const handlerCloseEditUser = () => {
    setShowEditModal(false);
  };

  const handlerEditDataUser = (e, user) => {
    setUserToEdit(user);
    setShowEditModal(!showEditModal);
  };

  const handlerDeletingUser = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = id => {
    setShowDeleteModal(!showDeleteModal);
    setIdToDelete(id);
  };

  return (
    <>
      <EditUserModal
        userToEdit={userToEdit}
        showEditModal={showEditModal}
        handlerCloseEditUser={handlerCloseEditUser}
      />
      <DeleteUserModal
        idToDelete={idToDelete}
        showDeleteModal={showDeleteModal}
        handlerDeletingUser={handlerDeletingUser}
      />
      <Table responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {status !== 'fulfilled' ? (
            <tr>
              <td>
                <Alert variant="warning">L O A D I N G...</Alert>
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user, id) => (
              <tr key={id + user.name}>
                <td>{user.id && user.id}</td>
                <td>{user.name}</td>
                <td>{user.username && user.username}</td>
                <td>{user.email}</td>
                <td>{user.address && user.address.city}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={e => {
                      handlerEditDataUser(e, user);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <Alert variant="warning">List is empty!</Alert>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {error && <h2>Error: {error}</h2>}
    </>
  );
};

export default UsersList;
