import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

const BookingPage = () => {
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(null); // Added date state
  const [timing, setTiming] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false); // Added state to handle availability

  // login user data
  const getuserData = async () => {
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
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Effect to fetch doctor data
  useEffect(() => {
    getuserData();
  }, []);

  // Function to check availability (add your actual check here)
  const checkAvailability = () => {
    // Here you'd have logic to check if the selected timing is available for the doctor
    if (date && timing.length === 2) {
      // Placeholder logic
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1>Booking Page</h1>
        <div className="container">
          {doctors && (
            <div className="border p-2 w-50">
              <p>
                Dr. : {doctors.firstName} {doctors.lastName}
              </p>
              <p>Fees : {doctors.feesPerConsultation}</p>
              <div className="d-flex flex-column">
                <DatePicker
                  placeholder="Select Date"
                  format="DD-MM-YYYY" // Fixed typo from "formate" to "format"
                  onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
                />
                <TimePicker.RangePicker
                  format="HH:mm"
                  className="mt-2"
                  onChange={(values) => setTiming(values)} // Corrected onChange for TimePicker
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={checkAvailability}
                >
                  Check Availability
                </button>
                <button
                  className="btn btn-dark mt-2"
                  onClick={checkAvailability}
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
