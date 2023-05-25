import React, { useState, useContext } from "react";
import GlobalState from "../extras/GlobalState";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

const WithdrawModal = ({ isOpen, toggle, account }) => {
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("Withdraw");
  const ACCESS_TOKEN = useContext(GlobalState);

  const handleWithdraw = () => {
    if (transactionType === "Deposit") {
      axios
        .post(
          `http://localhost:9090/transaction/deposit/${account.id}?amount=${amount}`,
          {
            name: account.name,
            customerId: account.customerId,
            balance: account.balance,
            accountType: account.accountType,
          },
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toggle();
          toast.success("Deposit Success");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(
          `http://localhost:9090/transaction/withdraw/${account.id}?amount=${amount}`,
          {
            name: account.name,
            customerId: account.customerId,
            balance: account.balance,
            accountType: account.accountType,
          },
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toggle();
          if (amount > account.balance) {
            toast.error("Insufficient Funds");
          } else {
            toast.success("Withdraw Success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Withdraw</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="amount">Amount:</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="transactionType">Transaction Type:</Label>
            <Input
              type="select"
              name="transactionType"
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option>Withdraw</option>
              <option>Deposit</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleWithdraw}>
          Perform Transaction
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WithdrawModal;
