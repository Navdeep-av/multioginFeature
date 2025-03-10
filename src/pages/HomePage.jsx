import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to Multi Login Feature</h2>
      <ul>
        <p>
          <Link to={"/login"}>Login</Link>
        </p>
        <p>
          {" "}
          <Link to={"/signup"}>Signup</Link>
        </p>
      </ul>
    </div>
  );
};

export default HomePage;
