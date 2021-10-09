import React from "react";
import OperatorForm from "./OperatorForm";
import Logo from "./Components/Logo"
import LoginPage from "./UserAuth/LoginPage";

function App() {
  return (
    <div>
      <Logo height={'5em'} />
      <OperatorForm />
      <LoginPage />
    </div>
  );
}

export default App;
