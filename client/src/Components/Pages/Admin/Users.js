import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // AntD table Col

  const colums = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "yes" : "No"}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex ">
          <button className="btn btn-danger">Block User</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-5">
        <h1>All Users</h1>
        <Table columns={colums} dataSource={users} />
      </div>
    </Layout>
  );
};

export default Users;
