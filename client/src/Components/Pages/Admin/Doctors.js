import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import axios from "axios";
import { message, Table } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getdoctors();
  }, []);

  const getdoctors = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/getAllDoctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data); // Add this to debug
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleaccountstatus = async (record, status) => {
    try {
      const res = await axios.post(
        `/api/v1/admin/updateAccountStatus`,
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload()
      }
    } catch (error) {
      message.error("Something Went wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status.toLowerCase() === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleaccountstatus(record, "approve")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-5">
        <h1>All Doctors</h1>
        <Table columns={columns} dataSource={doctors} scroll={{ y: 300 }} />
      </div>
    </Layout>
  );
};

export default Doctors;
