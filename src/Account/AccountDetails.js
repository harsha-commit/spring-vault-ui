import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import GlobalState from "../extras/GlobalState";
import api from "../api";

const AccountDetails = () => {
  const ACCESS_TOKEN = useContext(GlobalState);
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    customerId: Number(customerId),
    balance: 0,
    accountType: "SAVINGS",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(account);
    api
      .post("http://localhost:9090/account", account, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/customer-dashboard/${customerId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="name">Account Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  required
                  onChange={(event) => {
                    setAccount({ ...account, name: event.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="customerId">Customer ID</Label>
                <Input
                  type="number"
                  name="customerId"
                  id="customerId"
                  placeholder="Enter customer ID"
                  value={customerId}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="balance">Balance</Label>
                <Input
                  type="number"
                  name="balance"
                  id="balance"
                  placeholder="Enter balance"
                  value="0"
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="accountType">Account Type</Label>
                <Input
                  type="select"
                  name="accountType"
                  id="accountType"
                  defaultValue="SAVINGS"
                  onChange={(event) => {
                    setAccount({
                      ...account,
                      accountType: event.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Select account type
                  </option>
                  <option value="SAVINGS">Savings</option>
                  <option value="CHECKINGS">Checkings</option>
                </Input>
              </FormGroup>
              <Button color="primary" style={{ marginTop: "15px" }}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
