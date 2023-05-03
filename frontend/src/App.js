import HomePage from "./pages/HomePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import StoryDetailsPage from "./pages/StoryDetailsPage";
import CommentDetailsPage from "./pages/CommentDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" theme="dark" />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-feed" element={<HomePage />} />
          <Route path="/my-story" element={<HomePage />} />
          <Route path="/story/:id" element={<StoryDetailsPage />} />
          <Route
            path="/story/:storyID/comment/:commentID"
            element={<CommentDetailsPage />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
