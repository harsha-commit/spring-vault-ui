import React from "react";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import config from "./okta-config";

const OktaAuth = ({ children }) => {
  return (
    <Security {...config}>
      {children}
      <SecureRoute path="/protected" exact component={ProtectedPage} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </Security>
  );
};

export default OktaAuth;
