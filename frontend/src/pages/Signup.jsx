import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosWrapper from "../utils/AxiosWrapper";
import CustomButton from "../components/CustomButton";

const branchOptions = [
  "CSE",
  "MCA",
  "MTECH",
  "EE",
  "ECE",
  "PIE",
  "META",
  "CIVIL",
  "ME",
];

const initialFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  semester: "",
  branchId: "",
  gender: "",
  dob: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
};

export default function Signup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userType = localStorage.getItem("userType");

    if (userToken) {
      navigate(`/${userType?.toLowerCase() || "student"}`);
    }
  }, [navigate]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading("Creating your account...");

    try {
      const response = await axiosWrapper.post("/student/signup", {
        ...formData,
        semester: Number(formData.semester),
      });

      toast.dismiss();
      if (response.data.success) {
        toast.success("Signup successful. Please login with your new account.");
        navigate("/login?type=student");
        return;
      }

      toast.error(response.data.message || "Signup failed");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Student Signup</h1>
          <p className="mt-3 text-gray-600">
            Create a student account to access the college management system.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Faculty and admin accounts are still managed by the admin panel.
          </p>
        </div>

        <form
          className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First name"
            required
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Middle name"
            value={formData.middleName}
            onChange={(e) => updateField("middleName", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last name"
            required
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
          <input
            type="email"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          <input
            type="password"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            minLength={8}
            required
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="8"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Semester"
            required
            value={formData.semester}
            onChange={(e) => updateField("semester", e.target.value)}
          />
          <select
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={formData.branchId}
            onChange={(e) => updateField("branchId", e.target.value)}
          >
            <option value="">Select branch</option>
            {branchOptions.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <select
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={formData.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={formData.dob}
            onChange={(e) => updateField("dob", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            placeholder="Address"
            required
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City"
            required
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="State"
            required
            value={formData.state}
            onChange={(e) => updateField("state", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pincode"
            required
            value={formData.pincode}
            onChange={(e) => updateField("pincode", e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Country"
            required
            value={formData.country}
            onChange={(e) => updateField("country", e.target.value)}
          />

          <div className="md:col-span-2">
            <CustomButton
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </CustomButton>
          </div>

          <div className="md:col-span-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="font-medium text-blue-600 hover:underline"
              to="/login?type=student"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
