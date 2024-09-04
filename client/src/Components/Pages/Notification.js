import React from "react";
import Layout from "../Layout";
import { message, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ReadOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //   handle read notification
  const handleread = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `/api/v1/user/get-all-notification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Someting went wrong");
    }
  };

  // Delete Notification
  const handledelete = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `/api/v1/user/delete-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong in notification");
    }
  };

  return (
    <Layout>
      <h4 className="p-4 text-center">Notification</h4>
      <Tabs className="p-5">
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-4 text-success"
              onClick={handleread}
              style={{ cursor: "pointer" }}
            >
              <div className="clear-notifications-icon">
                <ReadOutlined />
                <span className="hover-text">Read All</span>
              </div>
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onclick={navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-4 text-danger"
              onClick={handledelete}
              style={{ cursor: "pointer" }}
            >
              <div className="clear-notifications-icon">
                <DeleteOutlined />
                <span className="hover-text">Clear All</span>
              </div>
            </h4>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onclick={navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
