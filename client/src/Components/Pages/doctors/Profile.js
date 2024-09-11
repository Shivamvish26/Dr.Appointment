import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Col, Form, Row, Input, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // update doc
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
      timing: timing.map((time) => time.toISOString()),
    };

    try {
      dispatch(showLoading(true));
      const res = await axios.post(
        `/api/v1/doctor/updateprofile`,
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Application Updated successfully!");
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
  // update doc end

  //  Get Doctor Info
  const getdoctorInfo = async () => {
    try {
      const res = await axios.post(
        `/api/v1/doctor/getDoctorInfo`,
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const doctorData = res.data.data;
        setDoctor(doctorData);
        setFirstName(doctorData.firstName || "");
        setLastName(doctorData.lastName || "");
        setPhone(doctorData.phone || "");
        setEmail(doctorData.email || "");
        setWebsite(doctorData.website || "");
        setAddress(doctorData.address || "");
        setSpecialization(doctorData.specialization || "");
        setExperience(doctorData.experience || "");
        setFeesPerConsultation(doctorData.feesPerConsultation || "");
        setTiming(doctorData.timing.map((time) => moment(time)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdoctorInfo();
    // esline-disable-next-line
  }, []);

  return (
    <Layout>
     <div className="p-4">
     <h1>Manage Profile</h1>
      {doctor ? (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-4"
          initialValues={doctor}
        >
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
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
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
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
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
              Update
            </button>
          </div>
        </Form>
      ) : (
        <div>Please wait while your data is loading...</div>
      )}
     </div>
    </Layout>
  );
};

export default Profile;
