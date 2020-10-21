import React, { memo, useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonToggle,
} from "reactstrap";
import { Provider, useAuth0 } from "../authen/auth0Service";
import { useHistory  } from "react-router-dom";
import { Alert } from 'reactstrap';
import { AlertCircle } from 'react-feather';

const LoginImpl = () => {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState();
  const { login } = useAuth0();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Bạn chưa điền đủ thông tin đăng nhập!");
      return;
    }

    const response = await login({ username, password });
    
    console.log(response)
    const message = (response === 200 ? '' : 'Đăng nhập không thành công');
    const wait = (response === 200 ? true : false)
    setError(message);
    setLoading(wait) 
  };

  const onSubmit = () => {
    loading && history.push("/main")
  }

  const AlertDanger = ({title}) => (
    <Alert color="danger" isOpen={true}>
        <AlertCircle size={15} />{" "}
        <span>
            {title}
        </span>
    </Alert>
)

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
                  type="submit"
                  onClick={onSubmit()}
                >
                  Đăng Nhập
                </ButtonToggle>
              </div>
            </form>
          </CardBody>
          {error && <div className='mt-3'>
          <AlertDanger title={error} />
        </div>}
        </Card>      
      </Container>
    </div>
  );
};

const Login = () => <Provider><LoginImpl /></Provider>

export default memo(Login);
