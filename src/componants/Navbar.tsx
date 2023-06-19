import { AppBar, Button, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/home");
  };
  return (
    <AppBar className="appBar">
      <div className="appBarContainer">
        <div className="appBarLeftContent">
          <Button variant="contained" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="contained" onClick={() => navigate("/createpost")}>
            Create Post
          </Button>
        </div>
        <div className="appBarRightContent">
          {auth.currentUser ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <Avatar
                src={auth.currentUser?.photoURL || ""}
                onClick={() => navigate("/profile")}
              />
              <p>{auth.currentUser?.displayName}</p>
            </div>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                signInWithGoogle();
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </AppBar>
  );
}

export default Navbar;
