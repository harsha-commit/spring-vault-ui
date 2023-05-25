import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import GlobalState from "../extras/GlobalState";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const ACCESS_TOKEN = useContext(GlobalState);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .get("http://localhost:9090/customer/" + customerId + "/" + password, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        onLogin(true);
        navigate(`/customer-dashboard/${customerId}`);
      })
      .catch((error) => {
        onLogin(false);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4">Login</h2>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="text">Customer ID</Label>
              <Input
                type="text"
                id="text"
                onChange={(event) => {
                  setCustomerId(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
