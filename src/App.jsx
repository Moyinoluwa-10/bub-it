import "./App.css";
import "./styles/css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Recent from "./pages/Recent";
import Login from "./pages/Login";
import Register from "./pages/Register";

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

