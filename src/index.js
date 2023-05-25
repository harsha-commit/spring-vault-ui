import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalStateContext from "./extras/GlobalState";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const globalVariable =
  "eyJraWQiOiIwWkNzSDBKSUZybWV2TmxvSENab1UyR3FLWEcwT0h2MzhPTnpOTHQ4NG8wIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnJIemg2eWtxMlozU0lWRlJlVnBuUmRWWEdrT19kc3VOOHZnN1U4dGxvNUUiLCJpc3MiOiJodHRwczovL2Rldi0yMTk4NzkwOC5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2ODQ5ODY2MTksImV4cCI6MTY4NDk5MDIxOSwiY2lkIjoiMG9hOWt4YzEzbE5lS3pScFA1ZDciLCJ1aWQiOiIwMHU5bDVycXFkc3FHYjY4VzVkNyIsInNjcCI6WyJwcm9maWxlIiwiZW1haWwiLCJvcGVuaWQiXSwiYXV0aF90aW1lIjoxNjg0OTg2NjE3LCJzdWIiOiJiYXNoYXZhdGhpbmloYXJzaGF2YXJkaGFuQGdtYWlsLmNvbSIsImdyb3VwcyI6WyJFdmVyeW9uZSIsIkN1c3RvbWVyIiwiQWRtaW4iXX0.X6NParWtTvgucGhjyj_vXhjZLZ0Er4tjhvsYuth55md5UAMkjbkPJGUGCq2PdGjF3DNUsSGek77BRd4JRdE_pUqLXOdm37qialYZ-81Jf8VgVdUv1XR7VGX38VfC1jaiw3ja_KDac8lGVJTcGb2iX3MewFmaVA2gUrp63O2s9ewx2ec--ZP-20T_-6H5Q3RhnzJr3XSJYZKzxny6ZVrBt7hziOmJBTovuH_WWLiTDj5yvUcBB3_Rxd29nx0quwe0oLfWy1JeNmeM9EoKG1dgau75K5d7Zvothjisrp38buNnxVpAcIGO4uofbLsfFdHSA9omjB9u6IKYmNnLamKsDA";
root.render(
  <GlobalStateContext.Provider value={globalVariable}>
    <App />
  </GlobalStateContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
