import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const DeviceDetailsComp = () => {
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");
  const getBrowserID = localStorage.getItem("browserID");
  const [deviceData, setDeviceData] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      if (!getToken || !getBrowserID) {
        navigate("/login");
      } else {
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
            setDeviceData(response.data.data.loggedInDevice);
            console.log("Data", response.data.data.loggedInDevice);
          } else {
            navigate("/login");
          }
        } catch (err) {
          navigate("/login");
          console.log(err);
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async (id) => {
    console.log(id);
    const getToken = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://192.168.1.6:4100/auths/logout",
        { deviceID: id },
        {
          headers: {
            authorization: getToken,
          },
        }
      );

      let updatedData = response.data.data.loggedInDevice;
      console.log("Responseddd", updatedData);
      setDeviceData(updatedData);

      let isPresent = updatedData.some((item) => item.id === getBrowserID);
      console.log("IsPresent", isPresent);
      if (!isPresent) {
        localStorage.removeItem("browserID");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  const handleLogoutFromAll = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.6:4100/auths/logoutfromall",
        {},
        {
          headers: {
            authorization: getToken,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("browserID");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login Device Details</h1>{" "}
      <ol>
        <table style={{ border: "1px solid #000" }}>
          {deviceData?.length > 0 ? (
            deviceData.map((item) => {
              return (
                <tr>
                  <li>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {item.deviceName}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {item.deviceType}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {item.lastLogin}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      <button onClick={() => handleLogout(item.id)}>
                        Log Out
                      </button>
                    </td>
                  </li>
                </tr>
              );
            })
          ) : (
            <h4>"No Device Available"</h4>
          )}
        </table>
      </ol>
      <button onClick={() => handleLogoutFromAll()}>Logout from All</button>
    </div>
  );
};

export default DeviceDetailsComp;
