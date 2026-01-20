import  "../../Styles/SigninSignup.css";
import { useState } from "react";
import SignInForm from "./Signin.jsx";
import SignUpForm from "./Signup.jsx";


export default function LoginSignup() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (signUp) => {
    if (signUp !== type) {
      setType(signUp);
      return;
    }
  };
  const containerClass =
"container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="Appes">
     
       

        {/* <h2>Sign in/up Form</h2> */}
        <div className={containerClass} id="container">
          <SignUpForm />
          <SignInForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                 <img src="/public/finallogo.png" alt="error" className="logo" />
                <h1>Already have an account</h1>
                <p>
                  If you already have an account, just sign in.
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <img src="/public/finallogo.png" alt="error" className="logo" />
                <h1> Don't have an account!</h1>
                <p>Create an Account & Sign-In </p>
                <button
                  className="ghost "
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
