import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./Components/Pages/HomePage";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";

function App() {
  return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        </BrowserRouter>
      </>

  );
}

export default App;
