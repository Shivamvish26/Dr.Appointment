import React, { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  // login user data
  const getuserData = async () => {
    try {
      const res = await axios.post(
        `/api/v1/user/getuserData`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserData();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}
