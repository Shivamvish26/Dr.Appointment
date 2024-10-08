import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./Components/Spinner";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import PublicRoutes from "./Components/PublicRoutes";
import ApplyDoctor from "./Components/Pages/ApplyDoctor";
import Notification from "./Components/Pages/Notification";
import Doctors from "./Components/Pages/Admin/Doctors";
import Users from "./Components/Pages/Admin/Users";
import Profile from "./Components/Pages/doctors/Profile";
import BookingPage from "./Components/Pages/BookingPage";
import Appointments from "./Components/Pages/Appointments";
import DoctorAppoinment from "./Components/Pages/doctors/DoctorAppoinment";

function App() {
  const { loading } = useSelector((state) => state.alert);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoutes>
                  <ApplyDoctor />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <Notification />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor"
              element={
                <ProtectedRoutes>
                  <Doctors />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
             <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
             <Route
              path="/doctor/appointment/:doctorId"
              element={
                <ProtectedRoutes>
                  <BookingPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
             <Route
              path="/appointment"
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              }
            />
              <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoutes>
                  <DoctorAppoinment />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
