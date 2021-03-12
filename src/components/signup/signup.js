import React, { useState } from "react";
import 'toastr/build/toastr.min.css';

import { Link } from "react-router-dom";
import { baseUrl, api } from "../../common/constants";
import { apiProvider } from "../api/api";

function SignUp(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [contactNumber, setContactNumber] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await signUpUser({
      email,
      password,
      firstName,
      lastName,
      contactNumber
    });
    console.log(response);
  }

  async function signUpUser(data) {
    apiProvider.post(baseUrl + api.signup, data).then((res) => {
      if(res.data.success){
        alert(res.data.message)
        setTimeout(() => {
            props.history.push("/login");
        }, 1000)
      }
      else{
        alert(res.data.message)
      }
        
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">        
      <form onSubmit={handleSubmit}>
        <label class="form-label">Email</label>
        <input class="form-control" type="text" onChange={e => setEmail(e.target.value)} required/>
        <label class="form-label">Password</label>
          <input class="form-control" type="password" onChange={e => setPassword(e.target.value)} required/>
          <label class="form-label">First Name</label>
          <input class="form-control" type="firstName" onChange={e => setFirstName(e.target.value)} required/>
          <label class="form-label">Last Name</label>
          <input class="form-control" type="lastName" onChange={e => setLastName(e.target.value)} required/>
          <label class="form-label">Contact Number</label>
          <input class="form-control" type="contactNumber" onChange={e => setContactNumber(e.target.value)}/>
        <div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
        <p className="forgot-password text-right">
            Already registered? <Link to={"/login"}>Log in?</Link>
        </p>      
      </form>
      </div>
    </div>
  );
}

export default SignUp;
