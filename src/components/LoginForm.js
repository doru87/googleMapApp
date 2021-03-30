import React from "react";
import { Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const [details, setDetails] = React.useState({ username: "", password: "" });

  let history = useHistory();

  const submitHandler = (event) => {
    var dataObject = {
      username: details.username,
      password: details.password,
    };

    axios.post("https://6059f34db11aba001745d2c8.mockapi.io/login", dataObject);

    history.push({
      pathname: "/index",
    });
  };

  const usernameChange = (event) => {
    setDetails({ ...details, username: event.target.value });
  };
  const passwordChange = (event) => {
    setDetails({ ...details, password: event.target.value });
  };

  return (
    <Container>
      <div className="loginWrapper">
        <Row>
          <Form className="formLogin" onSubmit={submitHandler}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={details.username}
                onChange={usernameChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={details.password}
                onChange={passwordChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </div>
    </Container>
  );
}

export default LoginForm;
