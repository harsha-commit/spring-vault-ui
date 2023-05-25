import React, { useState, useContext } from "react";
import GlobalState from "../extras/GlobalState";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";

const TransferModal = ({ account, isOpen, toggle }) => {
  const ACCESS_TOKEN = useContext(GlobalState);
  const [destinationId, setDestinationId] = useState("");
  const [destinationAccountName, setDestinationAccountName] = useState("");
  const [amount, setAmount] = useState(0);

  const handleTransfer = () => {
    if (amount > account.balance) {
      toast.error("Insufficient Funds");
      return;
    }

    // Perform transfer logic here
    axios
      .post(
        `http://localhost:9090/transaction/transfer/${amount}`,
        {
          sourceId: account.id,
          sourceAccountName: account.name,
          destinationId,
          destinationAccountName,
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
        if (response.data) {
          toast.success("Transfer Success");
        } else {
          toast.error("Transfer Failed");
        }

        toggle();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Transfer Failed");
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Transfer Money</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="accountNumber">Account Number:</Label>
            <Input
              type="text"
              name="accountNumber"
              id="accountNumber"
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="accountName">Account Name:</Label>
            <Input
              type="text"
              name="accountName"
              id="accountName"
              value={destinationAccountName}
              onChange={(e) => setDestinationAccountName(e.target.value)}
            />
          </FormGroup>
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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleTransfer}>
          Transfer
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TransferModal;
