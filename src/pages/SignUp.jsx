import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const [message, setmessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4100/auths/signup",
        formData
      );

      if (response.status === 201) {
        setmessage(`${response.data.message} Redirecting to login page. `);
        setFormData({ name: "", email: "", pass: "" });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data.error);
      setmessage(error.response.data.error);
      setFormData({ name: "", email: "", pass: "" });
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Welcome to the Sign Up Page</h1>
      <form onSubmit={handleSignUp}>
        <p>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Password: </label>
          <input
            type="password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
          />
        </p>

        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
      {message ? <p>{message}</p> : ""}
    </div>
  );
};

export default SignUp;
