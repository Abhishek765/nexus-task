import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../buttons";
import { checkIsEmailValid } from "../../../utils/helperFunctions";
import { useUserContext } from "../../../context/User";
import { Input } from "../inputs";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/login`,
        formData,
        config
      );
      const { user } = response.data;
      toast.success("Login successful");

      if (user) {
        setUser(user);
      }

      navigate("/");
    } catch (error) {
      toast.error("login failed!");
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!checkIsEmailValid(formData.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full ">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md min-w-[345px]">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Welcome Back!
          </h1>
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            error={errors.email}
            placeholder="your@email.com"
            onChange={handleChange}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            error={errors.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <div className="flex items-center justify-center mb-4">
            <Link
              to="/register"
              className="text-xs text-indigo-500 hover:text-indigo-700 "
            >
              Create Account
            </Link>
          </div>
          <PrimaryButton onClick={handleFormSubmit}>Login</PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Login;
