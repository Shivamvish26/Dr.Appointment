import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

const Appointments = () => {
  const [appointment, setAppointment] = useState([]);
  const column = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstname} {record.doctorId.latname}
    //     </span>
    //   ),
    // },
    // {
    //     title: "Phone",
    //     dataIndex: "phone",
    //     render: (text, record) => (
    //       <span>
    //         {record.doctorId.phone}
    //       </span>
    //     ),
    //   },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).formate("DD-MM-YYYY")}
          {moment(record.time).formate("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const getAppointment = async () => {
    // Corrected function name
    try {
      const res = await axios.get("/api/v1/user/user-appoinment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAppointment(res.data.data); // Corrected state variable name
      }
    } catch (error) {
      console.error("Failed to fetch user appointments:", error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1>Appoinment Lists</h1>
        <Table columns={column} dataSource={appointment} />
      </div>
    </Layout>
  );
};

export default Appointments;
