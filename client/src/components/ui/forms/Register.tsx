import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PrimaryButton } from "../buttons";
import axios from "axios";
import { useState } from "react";
import { checkIsEmailValid } from "../../../utils/helperFunctions";
import { Input } from "../inputs";

//!: this whole form logic can be replaced with react hook form in a better way
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/register`,
        formData,
        config
      );
      toast.success("Registration successful");
      navigate("/login");
    } catch (error: any) {
      const axiosErrorMessage = error?.response?.data?.message;
      toast.error(axiosErrorMessage ?? "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!checkIsEmailValid(formData.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "password must be at least 6 characters";
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
            Register
          </h1>
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            error={errors.name}
            onChange={handleChange}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            label="Password"
            type="text"
            placeholder="Enter your password"
            value={formData.password}
            error={errors.password}
            onChange={handleChange}
          />
          <div className="flex items-center justify-center mb-4">
            <Link
              to="/login"
              className="text-xs text-indigo-500 hover:text-indigo-700 "
            >
              Already have an account? Sign In!
            </Link>
          </div>
          <PrimaryButton onClick={handleFormSubmit} disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Register;
