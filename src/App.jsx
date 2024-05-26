import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import FileUpload from "./components/FileUpload";
import LoginPage from "./components/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
// to get the username store on localStorage 
  const userName = localStorage.getItem("username");

  // handle Login function for user login
  const handleLogin = () => {
    const username = localStorage.getItem("username");
    if (username) setIsLoggedIn(true);
  };
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/upload" : "/login"} />}
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/upload"
            element={
              isLoggedIn ? (
                <FileUpload userName={userName} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
