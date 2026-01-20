

import ShowToast from "../../Components/Reuseable_Components/ShowToast";
import { getPost } from "../../Api/Api_Methods.jsx";
import { useState} from "react";
import { useNavigate } from "react-router-dom";



function SignInForm() {
  const [input, setInput] = useState({ Username: "", Password: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

 

const handleOnSubmit = async (evt) => {
  evt.preventDefault();

  if (!input.Username || !input.Password) {
    setSnackbar({
      open: true,
      message: "Username & Password required!",
      severity: "error",
    });
    return;
  }

  try {
    setLoading(true);

    const res = await getPost(`?Username=${input.Username}`);
    // console.log(res.data);
    const exactUser = res.data.find(
      (u) => u.Username === input.Username
    );
     console.log(res.data);
    if (!exactUser) {
      setSnackbar({
        open: true,
        message: "Invalid username",
        severity: "error",
      });
      return;
    }

    if (exactUser.Password !== input.Password) {
      setSnackbar({
        open: true,
        message: "Invalid password",
        severity: "error",
      });
      return;
    }

    setSnackbar({
      open: true,
      message: "Login successful!",
      severity: "success",
    });

    localStorage.setItem("userId", exactUser.id);

    setTimeout(() => {
      navigate("/Dashboard");
        window.location.href = "/Dashboard";
    }, 1000);

  

   setInput({
       
        Username: "",
        Password: "",
        
      });

  } 
  catch (error) {
    setSnackbar({
      open: true,
      message: "This Username or Password is Not Exist!",
      severity: "error",
    });
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <div className="form-container sign-in-container">
        <form onSubmit={handleOnSubmit}>
          <h1>Sign in</h1>
          <input
            type="text"
            placeholder="Username"
            name="Username"
            value={input.Username}
            onChange={handleChange}
            disabled={loading}
          />

          
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={input.Password}
            onChange={handleChange}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
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

export default SignInForm;