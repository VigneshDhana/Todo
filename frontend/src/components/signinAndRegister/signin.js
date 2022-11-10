import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "./register";

function Signin({ setUser, setContent }) {
  const navigate = useNavigate();
  const handleSignin = function (e) {
    e.preventDefault();
    async function getdata() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      const result = await (
        await fetch("https://todo-by-vignesh.herokuapp.com/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
      ).json();
      if (result["username"] === username) {
        setUser(result);
        navigate("/todo");
      } else {
        alert(result["message"]);
      }
    }
    getdata();
  };
  return (
    <div className="landingcontent">
      <h1>SignIn</h1>
      <form>
        <input id="username" type="text" placeholder="Username" />
        <br />
        <br />
        <input id="password" type="password" placeholder="Password" />
        <br />
        <br />
        <button
          onClick={(e) => {
            handleSignin(e);
          }}
        >
          Sign In
        </button>
      </form>
      <p>Don't have an account?</p>
      <button
        onClick={() =>
          setContent(<Register setUser={setUser} setContent={setContent} />)
        }
      >
        Register
      </button>
    </div>
  );
}

export default Signin;
