import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Col, CardHeader, Row, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import AccountHistory from "./AccountHistory";
import WithdrawModal from "./WithdrawModal";
import TransferModal from "./TransferModal";
import GlobalState from "../extras/GlobalState";
import api from "../api";

const AccountDashboard = () => {
  const [currentAccount, setCurrentAccount] = useState({});
  const { customerId, accountId } = useParams();

  const ACCESS_TOKEN = useContext(GlobalState);

  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([]);

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Get Account Data

  console.log("Account ID: " + accountId);
  api
    .get("http://localhost:9090/account/" + accountId, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      setCurrentAccount(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  api
    .get(
      `http://localhost:9090/transaction/${customerId}?name=${currentAccount.name}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      // console.log(response.data);
      setTransactions(response.data.reverse());
    })
    .catch((error) => {
      console.log(error);
    });

  api
    .get(`http://localhost:9090/transaction/payments/${accountId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //console.log(response.data);
      setPayments(response.data.reverse());
    })
    .catch((error) => {
      console.log(error);
    });

  const toggleWithdrawModal = () => {
    setIsWithdrawModalOpen(!isWithdrawModalOpen);
  };

  const toggleTransferModal = () => {
    setIsTransferModalOpen(!isTransferModalOpen);
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <h2>Account Dashboard</h2>
            </CardHeader>
            <CardBody>
              <h3>{currentAccount.name}</h3>
              <p>Account Type: {currentAccount.accountType}</p>
              <p>Current Balance: ₹ {currentAccount.balance}</p>
              <div className="mt-4">
                <Row>
                  <Col md="6">
                    <Button
                      className="btn btn-success w-100"
                      onClick={toggleWithdrawModal}
                    >
                      Withdraw/Deposit
                    </Button>
                  </Col>
                  <Col md="6">
                    <Button
                      className="btn btn-success w-100"
                      onClick={toggleTransferModal}
                    >
                      Transfer
                    </Button>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        toggle={toggleWithdrawModal}
        account={currentAccount}
      />
      <TransferModal
        isOpen={isTransferModalOpen}
        toggle={toggleTransferModal}
        account={currentAccount}
      />
      <br />
      <AccountHistory transactions={transactions} payments={payments} />
    </div>
  );
};

export default AccountDashboard;
