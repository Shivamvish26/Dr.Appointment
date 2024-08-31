import React, { useState } from "react";
import Layout from "../Layout";
import { Col, Form, Row, Input, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const ApplyDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [feesPerConsultation, setFeesPerConsultation] = useState("");
  const [timing, setTiming] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleFinish = async () => {
    const values = {
      firstName,
      lastName,
      phone,
      email,
      website,
      address,
      specialization,
      experience,
      feesPerConsultation,
      timing: timing.map((time) => time.toISOString()),  // Convert timing to ISO string format
    };
  
    try {
      dispatch(showLoading(true));
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Application submitted successfully!");
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-4">
        <h4>Personal Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              required
              rules={[
                { required: true, message: "Please input your First Name!" },
                {
                  min: 2,
                  message: "First Name must be at least 2 characters long.",
                },
                {
                  max: 50,
                  message: "First Name cannot be longer than 50 characters.",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              required
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              required
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              required
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website (Optional)">
              <Input
                type="text"
                placeholder="Enter your Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              required
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your Specialization!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              required
              rules={[
                { required: true, message: "Please input your Experience!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees for Consultation"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your Fees for Consultation!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter your Fees for Consultation"
                value={feesPerConsultation}
                onChange={(e) => setFeesPerConsultation(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timing"
              required
              rules={[
                { required: true, message: "Please select your Timing!" },
              ]}
            >
              <TimePicker.RangePicker
                use12Hours
                format="h:mm a"
                value={timing}
                onChange={(value) => setTiming(value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
