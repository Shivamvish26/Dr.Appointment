import React, { useState } from "react";
import "../Styles/RegisterStyle.css";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async () => {
    const values = { email, password };
    try {
      dispatch(showLoading());
      const res = await axios.post(`/api/v1/user/login`, values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Success");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log("error");
      dispatch(hideLoading());
      message.error("Invalid username or password");
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Login Form</h3>
        <Form.Item
          label="Email"
          required
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          required
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Link to="/register" className="text-decoration-none m-2">
          Not a user? Register here
        </Link>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
