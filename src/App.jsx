

import AppRoutes from "./Routes/AppRoutes";
import { useEffect, useState } from "react";
import { getPost } from "./Api/Api_Methods.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setLoadingUser(false);
      navigate("/Auth");   // ✅ now SAFE
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getPost(`/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("userId");
        navigate("/Auth");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [navigate]); // ✅ THIS LINE FIXES THE WARNING

  return <AppRoutes user={user} loading={loadingUser} />;
}

export default App;
