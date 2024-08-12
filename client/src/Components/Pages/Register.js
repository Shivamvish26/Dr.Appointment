import React from "react";
import "../Styles/RegisterStyle.css";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

export default function Register() {
  const [form] = Form.useForm();

  const onFinishHandler = (values) => {
    console.log(values);
    form.resetFields();
  };

  return (
    <div className="form-container">
      <Form
        form={form} // Connect form instance
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
          <Input type="text" />
        </Form.Item>
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
