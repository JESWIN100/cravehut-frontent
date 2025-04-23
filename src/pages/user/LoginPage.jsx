// components/common/AuthModal.jsx
import React, { useState } from "react";
import { toast } from "sonner";
import { axiosInstance } from "../../config/axisoInstance";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setShowAuthModal }) {
  const [authMode, setAuthMode] = useState("login");
  const [step, setStep] = useState(1);
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [loading, setLoading] = useState(false);

const navigate=useNavigate()
  const handleSignUp = async () => {
    if (passwordInput !== confirmPasswordInput) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axiosInstance.post("/user/create", {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
      },{withCredentials:true});
      toast.success(response.data.msg);
      setShowAuthModal(false);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Server error");
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axiosInstance.post("/user/login", { email: emailInput });
      toast.success(response.data.msg);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axiosInstance.post(
        "/user/login/verify-otp",
        { email: emailInput, otp: otpInput },
        { withCredentials: true }
      );
      toast.success(response.data.msg);
    //  navigate("/")
       // Wait a moment to show the loader
    setTimeout(() => {
      setShowAuthModal(false);  // Then close the modal
      window.location.reload(); // Reload after modal is gone
    }, 1000); // 1 second delay

    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading on error
      toast.error(error.response?.data?.msg);
    }
  };

  return (
    <>
    <div>
    {loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="text-center">
      <div className="loader mb-4 mx-auto"></div>
      <p className="text-white text-lg">Reloading...</p>
    </div>
  </div>
)}
  </div>
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60">
      <div className="bg-white text-black h-full w-full sm:max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {authMode === "login" ? "Sign In" : "Sign Up"}
        </h2>

        {authMode === "signup" ? (
          <>
            <input type="text" placeholder="Full Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full border rounded px-4 py-2 mb-3" />
            <input type="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full border rounded px-4 py-2 mb-3" />
            <input type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full border rounded px-4 py-2 mb-3" />
            <input type="password" placeholder="Confirm Password" value={confirmPasswordInput} onChange={(e) => setConfirmPasswordInput(e.target.value)} className="w-full border rounded px-4 py-2 mb-4" />

            <div className="flex justify-between gap-2">
              <button onClick={handleSignUp} className="bg-yellow-400 text-white px-4 py-2 rounded w-full">Sign Up</button>
              <button onClick={() => setShowAuthModal(false)} className="text-gray-600 hover:text-black w-full">Cancel</button>
            </div>
          </>
        ) : (
          <>
            {step === 1 ? (
              <>
                <input type="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full border rounded px-4 py-2 mb-3" />
                <div className="flex justify-between gap-2">
                  <button onClick={handleSendOtp} className="bg-yellow-400 text-white px-4 py-2 rounded w-full">Send OTP</button>
                  <button onClick={() => setShowAuthModal(false)} className="text-gray-600 hover:text-black w-full">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <input type="text" placeholder="Enter OTP" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} className="w-full border rounded px-4 py-2 mb-4" />
                <div className="flex justify-between gap-2">
                  <button onClick={handleVerifyOtp} className="bg-yellow-400 text-white px-4 py-2 rounded w-full">Verify OTP</button>
                  <button onClick={() => setStep(1)} className="text-gray-600 hover:text-black w-full">Back</button>
                </div>
              </>
            )}
          </>
        )}

        <div className="text-center mt-4">
          <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-blue-500 hover:underline">
            {authMode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
