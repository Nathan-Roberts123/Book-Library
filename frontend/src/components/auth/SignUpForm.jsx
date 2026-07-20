import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye } from "react-icons/fi";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordPolicyError, setPasswordPolicyError] = useState("");

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    setConfirmPasswordError("");
    setPasswordPolicyError("");

    setLoading(true);

    if (signUp.password != signUp.confirm_password) {
      setConfirmPasswordError("passwords must match");
      return;
    }

    try {
      const response = await fetch(
        "https://cd4u4zcxfw35tzjy5a3bwhhchy0jgzpw.lambda-url.us-east-1.on.aws/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signUp.email,
            password: signUp.password,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.errors) {
          // This maps the exact backend "errors" dictionary to your state
          setValidationErrors(errorData.errors);
        } else {
          setPasswordPolicyError(errorData.error);
          // Fallback for non-validation errors (like a 500 server crash)
          setError(errorData.error);
        }
        return;
      }

      const data = await response.json();

      if (data.message.httpStatusCode === 200) {
        navigate("/auth/signin");
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-red-500">{error}</p>
      {/* Email */}
      <div className="mt-6">
        <Input
          name="email"
          label="Email address"
          placeholder="Enter your email address"
          icon={<FiMail />}
          type="email"
          value={signUp.email}
          onChange={handleChange}
        />
      </div>
      {validationErrors.Email &&
        validationErrors.Email.map((msg, index) => (
          <span
            key={index}
            style={{ color: "red", fontSize: "12px", display: "block" }}
          >
            {msg}
          </span>
        ))}

      {/* Password */}
      <div className="mt-6">
        <label className="font-semibold text-gray-800">Password</label>

        <div className="mt-2 border rounded-xl h-16 flex items-center px-5">
          <FiLock className="text-gray-400 text-xl" />

          <input
            name="password"
            type="password"
            placeholder="Create a password"
            className="flex-1 ml-4 outline-none text-lg"
            value={signUp.password}
            onChange={handleChange}
          />

          <FiEye className="text-gray-400 text-xl cursor-pointer" />
        </div>
        {validationErrors.Password &&
          validationErrors.Password.map((msg, index) => (
            <span
              key={index}
              style={{ color: "red", fontSize: "12px", display: "block" }}
            >
              {msg}
            </span>
          ))}

        <p className="text-gray-500 mt-2">
          Must be at least 8 characters long.
        </p>
      </div>

      {/* Confirm Password */}
      <div className="mt-6">
        <label className="font-semibold text-gray-800">Confirm password</label>

        <div className="mt-2 border rounded-xl h-16 flex items-center px-5">
          <FiLock className="text-gray-400 text-xl" />

          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm your password"
            className="flex-1 ml-4 outline-none text-lg"
            value={signUp.confirm_password}
            onChange={handleChange}
          />

          <FiEye className="text-gray-400 text-xl cursor-pointer" />
        </div>

        <p className="text-red-500">{confirmPasswordError}</p>
        <p className="text-red-500">{passwordPolicyError}</p>
      </div>

      {/* Button */}
      <button className="w-full h-16 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold transition">
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

function Input({ name, label, placeholder, icon, onChange, value, type }) {
  return (
    <div>
      <label className="font-semibold text-gray-800">{label}</label>

      <div className="mt-2 border rounded-xl h-16 flex items-center px-5">
        <div className="text-gray-400 text-xl">{icon}</div>

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="flex-1 ml-4 outline-none text-lg"
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}

export default SignUpForm;
