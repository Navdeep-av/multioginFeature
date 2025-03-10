import { createRoot } from "react-dom/client";
// import SignUp from "./pages/SignUp";
import LoginComp from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeviceContaxt from "./contaxtAPI/saveDetailsMethods";
import DeviceDetailsComp from "./pages/DeviceDetails";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: (
      <DeviceContaxt>
        <LoginComp />
      </DeviceContaxt>
    ),
  },
  {
    path: "/devicedetails",
    element: (
      <DeviceContaxt>
        <DeviceDetailsComp />
      </DeviceContaxt>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
