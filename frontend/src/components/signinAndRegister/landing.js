import React from "react";
import { useState, useEffect } from "react";
import Signin from "./signin";
import "./landing.css";

function Landing({ setUser }) {
  const [content, setContent] = useState();
  useEffect(() => {
    setContent(<Signin setUser={setUser} setContent={setContent} />);
  }, []);

  return <div className="landing">{content}</div>;
}

export default Landing;
