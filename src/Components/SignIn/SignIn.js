import React, { useState } from "react";
import { auth } from "../../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <form className="m-4">
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email:
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="userEmail"
            name="userEmail"
            value={email}
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Password:
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="userPassword"
            name="userPassword"
            value={password}
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
      </div>
      <fieldset className="row mb-3"></fieldset>
      <button
        className="btn btn-primary"
        onClick={(event) => {
          signInWithEmailAndPasswordHandler(event, email, password);
        }}
      >
        Sign in
      </button>
    </form>
  );
};
export default SignIn;
