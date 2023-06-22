import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import Error from "./Pages/Error/Error";
// import Recent from "./Pages/Recent/Recent";
import "./styles/css/style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        {/* <Route exact path={"/recent"} element={<Recent />} /> */}
        {/* <Route exact path={"/error"} element={<Error />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

