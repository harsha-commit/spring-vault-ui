// Registration.js

import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Row, Col, FormText, FormFeedback } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import GlobalState from "../extras/GlobalState";
import api from "../api";

const Registration = () => {
  // ACCESS TOKEN

  const ACCESS_TOKEN = useContext(GlobalState);

  const [customer, setCustomer] = useState({});
  const [modal, setModal] = useState(false);

  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [panNumberError, setPanNumberError] = useState(null);
  const [aadharNumberError, setAadharNumberError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggle = () => setModal(!modal);

  const handleHide = () => {
    setIsVisible(false);
  };

  const firstNameHandler = (firstName) => {
    const result =
      new RegExp(/[A-Za-z]{1,32}/).test(firstName) &&
      firstName !== undefined &&
      !new RegExp(/[\d]/).test(firstName);

    setFirstNameError("Please enter valid first name.");

    if (result) {
      setFirstNameError(null);
      setCustomer({
        ...customer,
        firstName,
      });
    }
    return result;
  };

  const lastNameHandler = (lastName) => {
    const result =
      new RegExp(/[A-Za-z]{1,32}/).test(lastName) &&
      lastName !== undefined &&
      !new RegExp(/[\d]/).test(lastName);

    setLastNameError("Please enter valid last name.");

    if (result) {
      setLastNameError(null);
      setCustomer({
        ...customer,
        lastName,
      });
    }
    return result;
  };

  const panNumberHandler = (panNumber) => {
    const result = new RegExp(/[A-Z]{5}[0-9]{4}[A-Z]{1}/).test(panNumber);
    setPanNumberError("Please enter a valid PAN number.");
    if (result) {
      setPanNumberError(null);
      setCustomer({
        ...customer,
        panNumber,
      });
    }
    return result;
  };
  const aadharNumberHandler = (aadharNumber) => {
    const result = new RegExp(/[0-9]{12}/).test(aadharNumber);
    setAadharNumberError("Please enter a valid Aadhar number.");
    if (result) {
      setAadharNumberError(null);
      setCustomer({
        ...customer,
        aadharNumber,
      });
    }
    return result;
  };
  const phoneNumberHandler = (phoneNumber) => {
    const result = new RegExp(/[0-9]{10}/).test(phoneNumber);
    setPhoneError("Please enter a valid phone number.");
    if (result) {
      setPhoneError(null);
      setCustomer({
        ...customer,
        phoneNumber,
      });
    }
    return result;
  };
  const passwordHandler = (password) => {
    let result = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$/
    ).test(password);

    if (!result) setPasswordError("Please enter a valid password.");
    else {
      setPasswordError(null);
      setCustomer({
        ...customer,
        password,
      });
    }
    return result;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted!");
    console.log(customer);

    api
      .post("http://localhost:9090/customer", customer, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((customer) => {
        console.log(customer.data);
        if (customer.data > 0) {
          toggle();
          handleHide();
          setShowConfetti(true);
          setIsVisible(false);
        } else if (customer.data === -1) {
          toast.error("Account Already Exists with given Email ID");
        } else if (customer.data === -2) {
          toast.error("Account Already Exists with given PAN Number");
        } else if (customer.data === -3) {
          toast.error("Account Already Exists with given Aadhar Number");
        } else if (customer.data === -4) {
          toast.error("Account Already Exists with given Phone Number");
        }
        return;
      })
      .catch((error) => {
        console.log("Error at Customer URL: " + error);
        toast.error("Servers are Busy. Please TRY LATER");
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="mb-4">
              User Registration {!isVisible ? <>Completed ✅ </> : <></>}
            </h2>

            {showConfetti && <Confetti numberOfPieces={500} />}

            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Spring Vault says ...</ModalHeader>
              <ModalBody>
                <h4>Thank you, {customer.firstName}❤️🔥</h4>
                <hr />
                <p>Your data is sent for Verification ✅</p>
                <p>
                  You will be notified at: <b>{customer.email}</b>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    toggle();
                  }}
                >
                  Proceed
                </Button>{" "}
              </ModalFooter>
            </Modal>

            {isVisible && (
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstName">First Name *</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={(event) => {
                          firstNameHandler(event.target.value);
                        }}
                        invalid={firstNameError !== null}
                        required
                      />
                      <FormFeedback>{firstNameError}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastName">Last Name *</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(event) => {
                          lastNameHandler(event.target.value);
                        }}
                        invalid={lastNameError !== null}
                        required
                      />
                      <FormFeedback>{lastNameError}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="panNumber">PAN Number *</Label>
                  <Input
                    type="text"
                    name="panNumber"
                    id="panNumber"
                    onChange={(event) => {
                      panNumberHandler(event.target.value);
                    }}
                    invalid={panNumberError !== null}
                    required
                  />
                  <FormFeedback>{panNumberError}</FormFeedback>
                  <FormText>Format: AAAAA5555C</FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="aadharNumber">Aadhar Number *</Label>
                  <Input
                    type="text"
                    name="aadharNumber"
                    id="aadharNumber"
                    onChange={(event) => {
                      aadharNumberHandler(event.target.value);
                    }}
                    invalid={aadharNumberError !== null}
                    required
                  />
                  <FormFeedback>{aadharNumberError}</FormFeedback>
                  <FormText>Format: 12 digits (No Spaces)</FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="email">Email *</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(event) =>
                      setCustomer({ ...customer, email: event.target.value })
                    }
                    required
                  />
                  <FormText>Format: abc@xyz.com</FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="phone">Phone Number *</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={(event) => {
                      phoneNumberHandler(event.target.value);
                    }}
                    invalid={phoneError !== null}
                    required
                  />
                  <FormFeedback>{phoneError}</FormFeedback>
                  <FormText>Format: 10 digits</FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="pwd">Password *</Label>
                  <Input
                    type="password"
                    name="pwd"
                    id="pwd"
                    onChange={(event) => passwordHandler(event.target.value)}
                    invalid={passwordError !== null}
                    required
                  />
                  <FormFeedback>{passwordError}</FormFeedback>
                  <FormText>
                    Format: 6 - 12 characters, one number, one symbol, one
                    uppercase and one lowercase letter.
                  </FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="address">Address *</Label>
                  <Input
                    type="textarea"
                    name="address"
                    id="address"
                    onChange={(event) =>
                      setCustomer({ ...customer, address: event.target.value })
                    }
                    invalid={addressError !== null}
                    required
                  />
                  <FormFeedback>{addressError}</FormFeedback>
                </FormGroup>

                <Button color="primary" type="submit">
                  Bank Smarter
                </Button>
                <Button
                  color="warning"
                  onClick={() => {
                    setCustomer({});
                    if (firstNameError != null) setFirstNameError(null);
                    if (lastNameError != null) setLastNameError(null);
                    if (aadharNumberError != null) setAadharNumberError(null);
                    if (phoneError != null) setPhoneError(null);
                    if (panNumberError != null) setPanNumberError(null);
                    if (addressError != null) setAddressError(null);
                    if (passwordError != null) setPasswordError(null);
                  }}
                >
                  Reset
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
