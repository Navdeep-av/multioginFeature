import { useContext } from "react";
import { themeContaxt } from "../contaxtAPI/saveDetailsMethods";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeviceDetailsComp = () => {
  const navigate = useNavigate();

  const getData = useContext(themeContaxt);

  const deviceData = getData.deviceDetails;

  console.log("deviceData ", deviceData);

  useEffect(() => {
    const checkAuth = async () => {
      const getToken = localStorage.getItem("token");
      if (!getToken) {
        navigate("/login");
      } else {
        try {
          const response = await axios.get(
            "http://localhost:4100/checkauth",

            {
              headers: {
                authorization: getToken,
              },
            }
          );
          if (response) {
            console.log(response.data);
          }
        } catch (err) {
          navigate("/login");
          console.log(err);
        }
        // console.log("response ", response.data);

        // if (response.data.statusCode === 403) {
        //   return navigate("/login");
        // }
      }
    };

    checkAuth();
  }, []);

  return (
    <div>
      <h1>Login Device Details</h1>{" "}
      <ol>
        <table style={{ border: "1px solid #000" }}>
          {deviceData?.loggedInDevices.length > 0 &&
            deviceData.loggedInDevices.map((item) => {
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
                      <button>Log Out</button>
                    </td>
                  </li>
                </tr>
              );
            })}
        </table>
      </ol>
      <button>Logout from All</button>
    </div>
  );
};

export default DeviceDetailsComp;
