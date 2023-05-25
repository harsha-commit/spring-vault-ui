import React, { useState } from "react";
import { Button, Table } from "reactstrap";

const TransactionTable = ({ transactions }) => (
  <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Transaction Type</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Reason Code</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.transactionType}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.status}</td>
            <td>{transaction.reasonCode}</td>
            <td>{transaction.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const PaymentTable = ({ payments }) => (
  <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer ID</th>
          <th>Account Name</th>
          <th>Amount</th>
          <th>Reference</th>
          <th>Status</th>
          <th>Reason Code</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>{payment.sourceId}</td>
            <td>{payment.accountName}</td>
            <td>{payment.amount}</td>
            <td>{payment.reference}</td>
            <td>{payment.status}</td>
            <td>{payment.reasonCode}</td>
            <td>{payment.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const AccountHistory = ({ transactions, payments }) => {
  const [activeButton, setActiveButton] = useState("transactions");

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-start mb-4">
            <Button
              color="transparent"
              className={activeButton === "transactions" ? "active" : ""}
              onClick={() => setActiveButton("transactions")}
            >
              Transaction history
            </Button>
            <Button
              color="transparent"
              className={activeButton === "payments" ? "active" : ""}
              onClick={() => setActiveButton("payments")}
            >
              Payment history
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {activeButton === "transactions" ? (
            <TransactionTable transactions={transactions} />
          ) : (
            <PaymentTable payments={payments} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountHistory;
