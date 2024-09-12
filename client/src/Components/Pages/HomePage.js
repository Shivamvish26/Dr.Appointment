import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import { Row } from "antd";
import Doctorslists from "../Doctorslists";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);

  // login user data
  const getuserData = async () => {
    try {
      const res = await axios.get(`/api/v1/user/getAllDoctorslist`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserData();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-center">HomePage</h1>
        <Row>
          {doctors && doctors.map((doctor) => <Doctorslists doctor={doctor} />)}
        </Row>
      </div>
    </Layout>
  );
}
