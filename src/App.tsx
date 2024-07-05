import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import goToTop from "./GoToTop";

function App() {
  useEffect(() => {
    goToTop();
  }, []);
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
