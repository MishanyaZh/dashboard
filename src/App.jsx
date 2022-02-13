import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersAction } from './redux/users-operations';
import { Container, Col, Row, Button, Card } from 'react-bootstrap';

import UsersList from './components/UsersList/UsersList';
import AddUserModal from './components/AddUserModal/AddUserModal';

import './App.css';
function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <Card bg="light">
            <Card.Header>Dashboard</Card.Header>
            <Card.Body>
              <Card.Title>
                User list
                <AddUserModal show={show} handleClose={handleClose} />
                <Button variant="primary" onClick={handleShow}>
                  Add new
                </Button>
              </Card.Title>
              <UsersList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
