import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { useUserContext } from "./context/User";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./hoc";
import { Suspense, lazy, useEffect } from "react";
import axios from "axios";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const App = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/users/me`, {
        withCredentials: true,
      })
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route element={<ProtectedRoute isUserPresent={Boolean(user)} />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route
              element={<ProtectedRoute isUserPresent={!user} redirect="/" />}
            >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
