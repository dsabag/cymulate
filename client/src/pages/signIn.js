import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import { Emailer } from "../components/Emailer.js";
import "../styles.css";

const checkToken = (cb) => {
  const token = Cookie.get("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken) {
      cb();
    }
  }
};

export const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    checkToken(() => {
      setIsSignedIn(true);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let { uname, pass } = document.forms[0];

      const signInResponse = await axios.post(
        "http://localhost:5000/signin",
        {
          uname: uname.value,
          pass: pass.value,
        },
        { withCredentials: true }
      );

      if (signInResponse.status === 200) {
        checkToken(() => {
          setIsSignedIn(true);
        });
      }
    } catch (e) {}
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="title">Sign In</div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      {!isSignedIn ? (
        <div className="login-form">{renderForm}</div>
      ) : (
        <Emailer />
      )}
    </div>
  );
};
