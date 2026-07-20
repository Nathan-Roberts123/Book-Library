import React from "react";
import { useState } from "react";
import { FiMail, FiLock, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SiginInForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSignIn({
      ...signIn,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});
    setError("");

    try {
      const response = await fetch(
        "https://cd4u4zcxfw35tzjy5a3bwhhchy0jgzpw.lambda-url.us-east-1.on.aws/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signIn.email,
            password: signIn.password,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 400 && errorData.errors) {
          // This maps the exact backend "errors" dictionary to your state
          setValidationErrors(errorData.errors);
        } else {
          // Fallback for non-validation errors (like a 500 server crash)
          setError(errorData.title || "An unexpected error occurred.");
        }

        return;
      }

      const data = await response.json();

      // 1. Dig into the "message" object from your JSON payload
      const tokenData = data.message;

      // 2. Save the tokens into browser LocalStorage
      localStorage.setItem("accessToken", tokenData.accessToken);
      localStorage.setItem("idToken", tokenData.idToken);
      localStorage.setItem("refreshToken", tokenData.refreshToken);
      localStorage.setItem("username", data.username);

      navigate("/books");

      setSignIn({ email: "", password: "" }); // Clear input on success
    } catch (error) {
      setError("Network disconnect. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-red-500">{error}</p>
      {/* Email */}
      <div className="mt-12">
        <label className="font-semibold text-gray-700">Email address</label>

        <div className="mt-3 flex items-center border rounded-xl h-16 px-5">
          <FiMail className="text-gray-400 text-xl" />

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="flex-1 ml-4 outline-none text-lg"
            onChange={handleChange}
            value={signIn.email}
          />
        </div>
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
      <div className="mt-8">
        <div className="flex justify-between">
          <label className="font-semibold text-gray-700">Password</label>
        </div>

        <div className="mt-3 flex items-center border rounded-xl h-16 px-5">
          <FiLock className="text-gray-400 text-xl" />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="flex-1 ml-4 outline-none text-lg"
            onChange={handleChange}
            value={signIn.password}
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
      </div>

      {/* Sign In */}
      <button className="mt-8 h-16 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl transition">
        {loading ? "Signing In..." : "Submit"}
      </button>
    </form>
  );
};

export default SiginInForm;
