import React from "react";
import { useNavigate } from "react-router-dom";

const Doctorslists = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="card"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/doctor/appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="m-3">
          <p>
            <b>Specialization : </b> {doctor.specialization}
          </p>
          <p>
            <b>Experience : </b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation : </b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Phone : </b> {doctor.phone}
          </p>
        </div>
      </div>
    </>
  );
};

export default Doctorslists;
