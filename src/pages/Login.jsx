import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { themeContaxt } from "../contaxtAPI/saveDetailsMethods";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const LoginComp = () => {
  const getDeviceDetails = useContext(themeContaxt);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setmessage] = useState("");

  const navigate = useNavigate();

  const getToken = localStorage.getItem("token");
  const getBrowserID = localStorage.getItem("browserID");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.6:4100/auths/checkauth",

          {
            headers: {
              authorization: getToken,
              browserID: getBrowserID,
            },
          }
        );
        console.log("Response: ", response.data);
        if (response.status === 200) {
          navigate("/devicedetails");
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setmessage("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    let uniqueID = localStorage.getItem("browserID");
    if (!uniqueID) {
      uniqueID = uuidv4().split("-")[0];
    }

    const response = await axios.post("http://192.168.1.6:4100/auths/login", {
      email: formData.email,
      pass: formData.password,
      browserID: uniqueID,
    });
    setFormData({ email: "", password: "" });
    setmessage("");
    if (response.data.statusCode === 404) {
      setFormData({ email: "", password: "" });
      return setmessage("Wrong Credentials");
    }

    localStorage.setItem("browserID", uniqueID);
    localStorage.setItem("token", response.data.token);
    getDeviceDetails.setDeviceDetails(response.data);
    navigate("/devicedetails");
  };

  console.log("Device Details ", getDeviceDetails.deviceDetails);

  return (
    <div>
      <h1>Login</h1>
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
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </p>
      <button onClick={handleLogin}>Login</button>
      {message ? message : ""}
    </div>
  );
};

export default LoginComp;
