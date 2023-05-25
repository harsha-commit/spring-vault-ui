// CustomerDashboard.js

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AccountList from "../Account/AccountList";
import api from "../api";
import GlobalState from "../extras/GlobalState";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState({});
  const { customerId } = useParams();
  const [accounts, setAccounts] = useState([{}]);
  const ACCESS_TOKEN = useContext(GlobalState);

  useEffect(() => {
    api
      .get("http://localhost:9090/customer/" + customerId, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCustomer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customerId, ACCESS_TOKEN]);

  useEffect(() => {
    // Get Accounts By Customer ID
    api
      .get("http://localhost:9090/account/customer/" + customerId, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accounts, customerId, ACCESS_TOKEN]);

  return (
    <>
      <header>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h1>
                Welcome, {customer.firstName} {customer.lastName}
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main>
        <AccountList accounts={accounts} customerId={customerId} />
      </main>
    </>
  );
};

export default CustomerDashboard;
