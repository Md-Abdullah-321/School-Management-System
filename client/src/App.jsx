import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateStudent from "./components/CreateStudent";
import CreateTeacher from "./components/CreateTeacher";
import ShowAndUpdateProfile from "./components/ShowAndUpdateProfile";
import ViewStudent from "./components/ViewStudent";
import ViewTeacher from "./components/ViewTeacher";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Classes from "./pages/Dashboard/Classes";
import Dashboard from "./pages/Dashboard/Dashboard";
import FeesAndPayments from "./pages/Dashboard/Fees&Payments";
import Login from "./pages/Dashboard/Login";
import Messages from "./pages/Dashboard/Messages";
import Notice from "./pages/Dashboard/Notice";
import Settings from "./pages/Dashboard/Settings";
import Teachers from "./pages/Dashboard/Teachers";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const path = window.location.pathname;
  const isDashboard = path.split("/");

  if (isDashboard.includes("admin")) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/teacher" element={<Teachers />} />
          <Route path="/admin/teacher/:id" element={<ViewTeacher />} />
          <Route path="/admin/teacher/create" element={<CreateTeacher />} />
          <Route path="/admin/student/:id" element={<ViewStudent />} />
          <Route path="/admin/classes" element={<Classes />} />
          <Route path="/admin/student/create" element={<CreateStudent />} />
          <Route path="/admin/notice" element={<Notice />} />
          <Route path="/admin/fees&payments" element={<FeesAndPayments />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/profile" element={<ShowAndUpdateProfile />} />
          <Route path="*" element={<NotFoundPage />} />{" "}
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
