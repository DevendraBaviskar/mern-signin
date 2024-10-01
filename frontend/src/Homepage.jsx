import { useState, useRef } from "react";
import axios from "axios";

import "./Homepage.css"; // Import your CSS file for the Homepage styles

function Homepage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(fullname, email);
  };

  const createUser = async (fullname, email) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        fullname,
        email,
      });
      console.log("User created successfully:", response.data);
      setFullname("");
      setEmail("");
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent the default scroll behavior
      if (document.activeElement === fullnameRef.current) {
        emailRef.current.focus(); // Move focus to the email input
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (document.activeElement === emailRef.current) {
        fullnameRef.current.focus(); // Move focus to the fullname input
      }
    }
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            ref={fullnameRef}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            onKeyDown={handleKeyDown} // Attach the keydown event handler
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown} // Attach the keydown event handler
            placeholder="Email"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Homepage;
