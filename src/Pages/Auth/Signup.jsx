

import ShowToast from "../../Components/Reuseable_Components/ShowToast.jsx";
import { addPost, getPost } from '../../Api/Api_Methods.jsx';
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [input, setInput] = useState({
    CompanyName: "",
    Username: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setInput({ ...input, [name]: value });
  }

  async function handleOnSubmit(evt) {
    evt.preventDefault();

    console.log("Form submitted button clicked");
    
    if (!input.Username || !input.Password || !input.CompanyName) {
      setSnackbar({
        open: true,
        message: "All fields are required!",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
     
      const response = await getPost();
      console.log(response.data);
      const existingUsers = response.data;
      
      
    const userExists = existingUsers.find(
      (user) => user.Username === input.Username
    );

    if (userExists) {
      setSnackbar({
        open: true,
        message: "This Username is already registered choose another one uniquely",
        severity: "error",
      });
      setLoading(false);
      return;
    }

    if (input.Password.length < 4) {
      setSnackbar({
        open: true,
        message: "Password should be at least 4 characters long",
        severity: "error",
      });
      setLoading(false);
      return;
    }
     
      const signupResponse = await addPost(input);
      console.log("Sign up response:", signupResponse);

      setSnackbar({
        open: true,
        message: "Account created successfully Now you can login",
        severity: "success",
      });

      
      setInput({
        CompanyName: "",
        Username: "",
        Password: "",
      });

      
      setTimeout(() => {
        // navigate("");
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("Sign up error:", error);
      setSnackbar({
        open: true,
        message: "Server Down. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="form-container sign-up-container">
        <form onSubmit={handleOnSubmit}>
          
          <h1>Create Account</h1>

          <input
            type="text"
            name="CompanyName"
            value={input.CompanyName}
            onChange={handleChange}
            placeholder="Company Name"
            disabled={loading}
          />
          <input
            type="text"
            name="Username"
            value={input.Username}
            onChange={handleChange}
            placeholder="Username"
            disabled={loading}
          />
          <input
            type="password"
            name="Password"
            value={input.Password}
            onChange={handleChange}
            placeholder="Password"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
      <ShowToast
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default SignUpForm;