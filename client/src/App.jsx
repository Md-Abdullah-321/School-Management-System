import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Dashboard/Login";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const path = window.location.pathname;
  const isDashboard = path.split("/");

  if (isDashboard.includes("admin")) {
    return (
      <BrowserRouter>
        <Routes>
          {/* Admin Route  */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
