import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Recent from "./pages/Recent/Recent";
import "./styles/css/style.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/sign_in"} element={<Login />} />
        <Route exact path={"/sign_up"} element={<Register />} />
        <Route exact path={"/recent-urls"} element={<Recent />} />
        <Route exact path={"*"} element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

