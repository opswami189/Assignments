import { Link } from "@reach/router";
import React, { useState } from "react";
import { auth, generateUserDocument } from "../../firebase";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    console.log(event);
    console.log(email);
    console.log(password);
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="m-2 container">
      <div className="row">
        <form className="col align-self-center">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Dispaly Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              name="displayName"
              value={displayName}
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              name="userEmail"
              id="userEmail"
              value={email}
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="userPassword" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              name="userPassword"
              value={password}
              placeholder=""
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
