import React, { useState } from "react";
import 'toastr/build/toastr.min.css';
import { Link } from "react-router-dom";
import { baseUrl, api } from "../../common/constants";
import { apiProvider } from "../api/api";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (localStorage.getItem("token")) {
    props.history.push(from.pathname);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await LogInUser({
      email,
      password,
    });
    console.log(response);
  }

  async function LogInUser(data) {
    apiProvider.post(baseUrl + api.login, data).then((res) => {
      console.log(res.data);
      const result = res.data;
      if (result.success) {
        window.location.reload();
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", JSON.stringify(result.userId));
      } else {
        alert(`Incorrect email or password`);
      }
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
        <label class="form-label">Email</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" onChange={e => setEmail(e.target.value)} required />
          </div>
          <label class="form-label">Password</label>
          <div class="input-group mb-3">
            <input type="password" class="form-control" onChange={e => setPassword(e.target.value)} required />
            
          </div>
          <div>
              <button class="btn btn-primary" type="submit">Submit</button>
            </div>
            <p className="forgot-password text-right">
              No account yet? <Link to={"/signup"}>Sign up now</Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
