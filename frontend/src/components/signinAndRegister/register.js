import React from "react";
import Signin from "./signin";

function Register({ setUser, setContent }) {
  function register(e) {
    e.preventDefault();
    async function getdata() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let confirmpassword = document.getElementById("confirmpassword").value;
      if (password === confirmpassword) {
        const result = await (
          await fetch("https://todo-by-vignesh.herokuapp.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          })
        ).json();
        if (result["message"] === "User Created") {
          setContent(<Signin setUser={setUser} setContent={setContent} />);
        } else {
          alert(result["message"]);
        }
      } else {
        alert("Password and Confirm password are not matching");
      }
    }
    getdata();
  }
  return (
    <div className="landingcontent">
      <h1>Register</h1>
      <form>
        <input id="username" type="text" placeholder="Username" />
        <br />
        <br />
        <input id="password" type="password" placeholder="Password" />
        <br />
        <br />
        <input
          id="confirmpassword"
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        <br />
        <button
          onClick={(e) => {
            register(e);
          }}
        >
          Register
        </button>
      </form>
      <p>Already have an account?</p>
      <button
        onClick={() => {
          setContent(<Signin setUser={setUser} setContent={setContent} />);
        }}
      >
        Sign In
      </button>
    </div>
  );
}

export default Register;
