import React, { useState } from "react";
import "../Styles/RegisterStyle.css";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinishHandler = async () => {
    const values = { name, email, password };
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/v1/user/register`, values);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success("Registration successful");
        form.resetFields(); // Reset form fields
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Register Form</h3>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
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
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Link to="/login" className="text-decoration-none m-2">
          Already a user? Login here
        </Link>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
