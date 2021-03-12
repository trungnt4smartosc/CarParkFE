import React, { useEffect, useState } from "react";

import { baseUrl, api } from "../../common/constants";
import { apiProvider } from "../api/api";

function Details() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    emailName: "",
    contractNumber: "",
  });
  const userId = localStorage.getItem("userId") ? JSON.parse(localStorage.getItem("userId")) : "";
  useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, []);

  const getUserInfo = () => {
    const url = `${baseUrl}${api.details}?id=${userId}`;
    apiProvider.get(url).then((res) => {
      if (res.data) {
        setUserInfo(res.data);
      }
    });
  };

  return (
    userInfo && (
      <React.Fragment>
        <div class="row">
          <div class="col-9">
            <h3>Account Details</h3>
            <div class="card">
              <div class="card-body">
                <div class="row form-group">
                  <div class="col-3">
                    <h5 class="card-title">First Name</h5>
                  </div>
                  <div class="col-6">{userInfo.firstName}</div>
                </div>
                <div class="row form-group">
                  <div class="col-3">
                    <h5 class="card-title">Last Name</h5>
                  </div>
                  <div class="col-6">{userInfo.lastName}</div>
                </div>
                <div class="row form-group">
                  <div class="col-3">
                    <h5 class="card-title">Email</h5>
                  </div>
                  <div class="col-6">{userInfo.email}</div>
                </div>
                <div class="row form-group">
                  <div class="col-3">
                    <h5 class="card-title">Contact Number</h5>
                  </div>
                  <div class="col-6">{userInfo.contactNumber}</div>
                </div>
              </div>

            </div>
          </div>
          <div class="col-3" id="avatar">
            <h3>Avatar</h3>
            <div class="card">
              <img src="https://iupac.org/wp-content/uploads/2018/05/default-avatar-300x300.png" />
            </div>

          </div>

        </div>
      </React.Fragment>
    )
  );
}

export default Details;
