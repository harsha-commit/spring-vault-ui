import React from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";

const AccountList = ({ accounts, customerId }) => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4">Accounts</h2>
          <ListGroup className="mb-5">
            {accounts.map((account) => (
              <ListGroupItem
                key={account.id}
                style={{
                  padding: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>
                    <h4>
                      <strong>{account.name}</strong>
                    </h4>
                  </p>
                  <p>
                    <strong>
                      <i>Account Number: </i>
                    </strong>
                    {account.id}
                  </p>
                  <p>
                    <strong>
                      <i>Current Balance: </i>
                    </strong>
                    ₹{account.balance}
                  </p>
                </div>
                <div>
                  <Button
                    color="primary"
                    onClick={() => {
                      const accountId = account.id;
                      navigate(`/account/${customerId}/${accountId}`);
                    }}
                  >
                    Open
                  </Button>
                </div>
              </ListGroupItem>
            ))}
            <ListGroupItem
              key="new-account"
              style={{
                padding: "30px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ paddingTop: "15px" }}>
                  <strong>CREATE A NEW ACCOUNT</strong>
                </p>
              </div>
              <div>
                <Link to={`/create-account/${customerId}`}>
                  <Button
                    color="primary"
                    size="lg"
                    style={{ borderRadius: "50%", marginRight: "7px" }}
                  >
                    +
                  </Button>
                </Link>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
