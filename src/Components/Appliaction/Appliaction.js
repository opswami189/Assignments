import React, { useContext } from "react";
import ProfilePage from "../ProfilePage/ProfilePage";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import { Router } from "@reach/router";
import { UserContext } from "../UserProvider/UserProvider";

function Application() {
  const user = useContext(UserContext);

  return user ? (
    <Home />
  ) : (
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
    </Router>
  );
}
export default Application;
