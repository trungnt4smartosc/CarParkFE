import React, { useEffect, useState } from "react";

import { baseUrl, api } from "../../common/constants";
import { apiProvider } from "../api/api";

function Home(props) {
  const [carParkInfo, setCarPark] = useState([]);
  useEffect(() => {
    getCarPark();
  }, []);

  const getCarPark = () => {
    const url = baseUrl + api.carPark;
    apiProvider.get(url).then((res) => {
      console.log(res.data);
      if (res.data) {
        setCarPark(res.data);
      }
    });
  };

  const renderCarParkInfo = () => {
    return carParkInfo &&
      carParkInfo.map((carPark, index) => {
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{carPark.carParkInfo[0].totalLots}</td>
            <td>{carPark.carParkInfo[0].lotType}</td>
            <td>{carPark.carParkInfo[0].lotsAvailable}</td>
            <td>{carPark.carParkNumber}</td>
            <td>{carPark.updateDatetime}</td>
          </tr>
        );
      });
  };

  return (
    carParkInfo && (
      <React.Fragment>
        <h2>Car Park Availability</h2>
        <table className="table table-striped" width="100%">
          <thead className="active">
            <tr>
              <th className="th">#</th>
              <th className="th">Total Lots</th>
              <th className="th">Lot Type</th>
              <th className="th">Lots Available</th>
              <th className="th">Car Park Number</th>
              <th className="th">Update Datetime</th>
            </tr>
          </thead>
          <tbody>{renderCarParkInfo()}</tbody>
        </table>
      </React.Fragment>
    )
  );
}

export default Home;
