import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        `/api/v1/doctor/getDoctorByID`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const checkAvailability = () => {
    if (date && time) {
      // Add logic to check availability from the backend, if needed
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  };

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: moment(time).format("HH:mm"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
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
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1>Booking Page</h1>
        <div className="container">
          {doctor && (
            <div
              className="border p-2 w-50"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <p>
                Dr. : {doctor.firstName} {doctor.lastName}
              </p>
              <p>Fees : {doctor.feesPerConsultation}</p>
              <div className="d-flex flex-column">
                <DatePicker
                  placeholder="Select Date"
                  format="DD-MM-YYYY"
                  onChange={(value) =>
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-2"
                  onChange={(value) => setTime(value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={checkAvailability}
                >
                  Check Availability
                </button>
                <button
                  className="btn btn-dark mt-2"
                  onClick={ handleBooking}
                  // disabled={!isAvailable}
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
