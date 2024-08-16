import React from "react";
import "../Styles/RegisterStyle.css";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`/api/v1/user/login`, values);
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
      <Form
        form={form} // Connect form instance
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login Form</h3>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
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
