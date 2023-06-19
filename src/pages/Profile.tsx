import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

function Profile() {
  const navigate = useNavigate();
  const signOutUser = async () => {
    signOut(auth);
  };
  return (
    <div className="pages">
      <h2>Profile Page</h2>
      <Button
        variant="contained"
        onClick={() => {
          signOutUser();
          navigate("/");
          window.location.reload();
        }}
      >
        LogOut
      </Button>
    </div>
  );
}

export default Profile;
