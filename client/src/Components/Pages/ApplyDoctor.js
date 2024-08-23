import React, { useState } from "react";
import Layout from "../Layout";
import { Col, Form, Row, Input, TimePicker } from "antd";

const ApplyDoctor = () => {
  // Declare state for each input field
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

  const handleFinish = () => {
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
      timing,
    };
    console.log(values);

    // Reset the states after form submission
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setWebsite("");
    setAddress("");
    setSpecialization("");
    setExperience("");
    setFeesPerConsultation("");
    setTiming([]);
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-4">
        <h4 className="">Personal Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="First Name" required>
              <Input
                type="text"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" required>
              <Input
                type="text"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Phone No" required>
              <Input
                type="number"
                placeholder="Enter your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" required>
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
            <Form.Item label="Address" required>
              <Input
                type="text"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <h4 className="">Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Specialization" required>
              <Input
                type="text"
                placeholder="Enter your Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Experience" required>
              <Input
                type="text"
                placeholder="Enter your Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Fees for Consultation" required>
              <Input
                type="number"
                placeholder="Enter your Fees for Consultation"
                value={feesPerConsultation}
                onChange={(e) => setFeesPerConsultation(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timing" required>
              <TimePicker.RangePicker
                use12Hours
                format="h:mm a"
                value={timing}
                onChange={(value) => setTiming(value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
