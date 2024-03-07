import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Info from "./pages/Info";
import Booking from "./pages/Booking.tsx";
import HelloWorld from "./HelloWorld.tsx";

function App() {
  return (
    <>
      {/* <HelloWorld /> */}
      <Home />
      {/* <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking/*" element={<Booking />} />
          </Routes>
        </div>
      </Router> */}
    </>
  );
}

export default App;
