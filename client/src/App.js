import React from "react";
import OperatorForm from "./Operator/OperatorForm";
import Logo from "./Components/Logo"
import LoginPage from "./UserAuth/LoginPage";
import SignupPage from "./UserAuth/SignupPage";

function App() {
  return (
    <div>
      <Logo height={'5em'} />
      <OperatorForm />
      <LoginPage />
      <SignupPage />
    </div>
  );
}

export default App;
