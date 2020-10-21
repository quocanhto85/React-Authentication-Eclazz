import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Alert,
  Container,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonToggle,
} from "reactstrap";

const Login = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState(process.env.REACT_APP_USERNAME);
  const [password, setPassWord] = useState(process.env.REACT_APP_PASSWORD);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Bạn chưa điền đủ thông tin đăng nhập!");
      return;
    }
    setIsLoggedIn(true);

  };

  return (
    <div className="app flex-row align-items-center">
      <Container
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "100px",
        }}
      >
        <Card style={{}} className="p-5">
          <CardBody>
            <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>
            <p className="text-muted" style={{ textAlign: "center" }}>
              Đăng Nhập Vào Tài Khoản Của Bạn
            </p>
            <form name="form" onSubmit={(e) => handleLogin(e)}>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                ></Input>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-lock" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassWord(e.target.value)}
                ></Input>
              </InputGroup>
              <div className="text-center">
                <ButtonToggle
                  color="dark"
                  onClick={() => {
                    !isLoggedIn && history.push("/");
                  }}
                >
                  Đăng Nhập
                </ButtonToggle>
              </div>
            </form>
          </CardBody>
        </Card>

      </Container>
    </div>
  );
};

export default Login;
