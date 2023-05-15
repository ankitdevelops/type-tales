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
import PrivateRoute from "./components/PrivateRoute";
import ImageUpload from "./components/ImageUpload";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" theme="dark" />
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <ImageUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/following"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/who-to-follow"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-feed"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-story"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/story/:id"
            element={
              <PrivateRoute>
                <StoryDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/story/:storyID/comment/:commentID"
            element={
              <PrivateRoute>
                <CommentDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:username"
            element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:username/stories"
            element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:username/replies"
            element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
