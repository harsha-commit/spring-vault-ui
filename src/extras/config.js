const config = {
  clientId: "0oa9kxc13lNeKzRpP5d7",
  issuer: "https://dev-88298957.okta.com/oauth2/default",
  redirectUri: window.location.origin + "/implicit/callback",
  scopes: ["openid", "profile", "email"],
};

export default config;
