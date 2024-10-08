import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";
import Layout from "../../Layout";

const DoctorAppoinment = () => {
  const [appointments, setAppointments] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) =>
        record.status === "pending" ? ( // Using a conditional operator
          <div className="d-flex">
            <button
              className="btn btn-success"
              onClick={() => handleStatus(record, "approved")}
            >
              Approved
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleStatus(record, "rejected")} // Fixed label and action
            >
              Reject
            </button>
          </div>
        ) : null, // Return null if the condition is not met
    },
  ];

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appoinment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log("Failed to fetch doctor appointments:", error);
    }
  };

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/updatestatus",
        {
          appointmentsId: record._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Someting Went Wrong");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1>Appointment Lists</h1>
        <Table columns={columns} dataSource={appointments} rowKey="_id" />
      </div>
    </Layout>
  );
};

export default DoctorAppoinment;
