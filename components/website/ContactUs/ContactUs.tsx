"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Cta from "../Homepage/Cta";

// Interfaces
interface FormData {
  fullName: string;
  email: string;
  phoneNo: string;
  message: string;
  address: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  phoneNo: string;
  message: string;
  address: string;
}

interface CustomButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

interface ProgressBarProps {
  progress: number;
}

interface CustomAlertProps {
  message: string;
  isOpen: boolean;
}

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Modal Alert Component with Animation
const CustomAlert: React.FC<CustomAlertProps> = ({ message, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black"
        />
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          exit={{ y: 50 }}
          className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 relative z-10"
        >
          <div className="flex items-center justify-center">
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <p className="text-center mt-4 text-gray-800 font-medium">
            {message}
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Progress Bar Component
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-600 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Custom Button Component
const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  loading = false,
  onClick,
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={loading}
    className={` bg-primary2 text-white font-semibold py-3 px-8 rounded-md transition-all duration-200 
      ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
  >
    {loading ? (
      <div className="flex items-center justify-center">
        <LoaderCircle className=" mr-2 animate-spin" />
        Sending...
      </div>
    ) : (
      children
    )}
  </button>
);

// Custom Input Component
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  ...props
}) => (
  <div className="w-full">
    <input
      {...props}
      className={`w-full px-4 py-3 border rounded-md text-sm font-medium outline-none transition-all duration-200
        ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 focus:border-blue-500"
        }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNo: "",
    message: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    phoneNo: "",
    message: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [apiError, setApiError] = useState<string>("");

  const validateForm = (): boolean => {
    let tempErrors: FormErrors = {
      fullName: "",
      email: "",
      phoneNo: "",
      message: "",
      address: "",
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Name is required";
      isValid = false;
    } else if (formData.fullName.length < 2) {
      tempErrors.fullName = "Name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phoneNo.trim()) {
      tempErrors.phoneNo = "Phone number is required";
      isValid = false;
    } else {
      let phone = formData.phoneNo.trim();

      // Ensure the number starts with '+'
      if (!phone.startsWith("+")) {
        phone = "+" + phone;
      }

      // Preserve the first space after the country code but remove all other spaces
      const parts = phone.split(" ");
      const cleanedPhone =
        parts[0] + (parts[1] ? " " + parts[1].replace(/\s+/g, "") : "");

      // Ensure the number has at least 10 digits after the country code
      const digitsOnly = cleanedPhone.replace(/\D/g, ""); // Remove non-numeric characters
      if (digitsOnly.length < 11) {
        tempErrors.phoneNo =
          "Please enter a valid phone number with country code and at least 10 digits";
        isValid = false;
      }
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    if (!formData.address.trim()) {
      tempErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (
    value: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data?: {} | CountryData,
    event?: React.ChangeEvent<HTMLInputElement>,
    formattedValue?: string
  ): void => {
    // Check if this is a PhoneInput change event
    if (typeof value === "string") {
      // Handle PhoneInput change
      setFormData((prev) => ({
        ...prev,
        phoneNo: value,
      }));
      if (errors.phoneNo) {
        setErrors((prev) => ({
          ...prev,
          phoneNo: "",
        }));
      }
    } else {
      // Handle regular input/textarea change
      const { name, value: inputValue } = value.target;
      setFormData((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setProgress(0);
    setApiError("");
    console.log("formData", formData);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setShowSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phoneNo: "",
        message: "",
        address: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Failed to submit inquiry"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <CustomAlert
          message="Message sent successfully!"
          isOpen={showSuccess}
        />
      )}

      <div className="grid md:grid-cols-2 gap-6 lg:w-11/12 3xl:w-8/12 w-11/12 mx-auto lg:my-20 md:my-14 my-8">
        <section>
          <h2 className="title lg:text-3xl md:text-3xl sm:text-2xl text-xl font-extrabold uppercase">
            Contact Info
          </h2>

          <div className="my-12 space-y-10">
            <div className="flex gap-6 text-center border-b pb-4">
              <Image
                src="/icons/placeholder.png"
                alt="location"
                width={1000}
                height={1000}
                className="w-[3rem] h-[3rem] object-cover object-center text-secondary-400 border rounded-full p-2"
              />
              <div className="font-medium md:text-lg text-base tracking-wide text-start">
                <p className="md:text-base text-xs text-gray-500">
                  Dhumbarahi,Lazimpat
                </p>
                <p className="font-bold"> Kathmandu,Nepal</p>
              </div>
            </div>

            <div className="flex gap-6 text-center border-b pb-4">
              <Image
                src="/icons/phone-call.png"
                alt="phone"
                width={1000}
                height={1000}
                className="w-[3rem] h-[3rem] object-cover object-center text-secondary-400 border rounded-full p-2"
              />
              <div className="font-medium md:text-lg text-base tracking-wide text-start">
                <p className="md:text-base text-xs text-gray-500">
                  Call us 24*7 Support
                </p>
                <p className="font-bold">+977-9856008848</p>
              </div>
            </div>

            <div className="flex gap-6 text-center border-b pb-4">
              <Image
                src="/icons/communication.png"
                alt="email"
                width={1000}
                height={1000}
                className="w-[3rem] h-[3rem] object-cover object-center text-secondary-400 border rounded-full p-2"
              />
              <div className="font-medium md:text-lg text-base tracking-wide text-start">
                <p className="md:text-base text-xs text-gray-500">
                  Email us at
                </p>
                <p className="font-bold">info@infinityadventurenepal.com</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sm:p-8 p-4 border-2 rounded-md border-primary2">
          <h2 className="title lg:text-3xl md:text-3xl sm:text-2xl text-xl font-extrabold uppercase">
            Get in touch
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:mt-12 mt-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                error={errors.fullName}
                required
              />
              <CustomInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                error={errors.email}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <PhoneInput
                  country={"us"}
                  value={formData.phoneNo}
                  onChange={(value, data, event, formattedValue) =>
                    handleChange(value)
                  }
                  enableSearch
                  placeholder="Enter phone number"
                  inputProps={{
                    name: "phoneNo",
                    required: true,
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    paddingLeft: "45px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    borderColor: errors.phoneNo ? "#ef4444" : "#ccc", // Add error styling
                  }}
                />
                {errors.phoneNo && (
                  <p className="mt-1 text-xs text-red-500">{errors.phoneNo}</p>
                )}
              </div>

              <CustomInput
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                error={errors.address}
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md text-sm font-medium outline-none transition-all duration-200
                  ${
                    errors.message
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Message"
                rows={5}
                required
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            {isSubmitting && <ProgressBar progress={progress} />}

            <div>
              <CustomButton type="submit" loading={isSubmitting}>
                Submit
              </CustomButton>
            </div>
            <p className="text-sm font-semibold text-gray-400">
              <span className="text-red-500">*</span>All fields are required
            </p>

            {apiError && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {apiError}
              </p>
            )}
          </form>
        </section>
      </div>

      <div className="md:w-10/12 w-11/12 mx-auto">
        <Cta />
      </div>
    </>
  );
};

export default ContactUs;
