import { customAlphabet } from "nanoid";
import React, { useState, ChangeEvent, useEffect } from "react";
import FormBg from "@/public/Hero.jpg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useRouter } from "next/navigation";
import Select from "react-select";
import countryList from "react-select-country-list";
import { AnimatePresence, motion } from "framer-motion";
import { useCollections } from "@/context/Collections";
import { useExpedition } from "@/context/Expeditions";
import Button from "@/components/ui/button";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

interface Option {
  value: string;
  label: string;
}

interface Expedition {
  _id: string;
  name: string;
  banner?: string;
}

const BookForm = ({
  groupDepartureId,
  slug,
}: {
  groupDepartureId: string | null;
  slug: string | null;
}) => {
  const { fetchExpedition, expedition } = useExpedition();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<Option | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    arrivalDate: "",
    departureDate: "",
  });

  const options = countryList().getData();
  const { collections } = useCollections();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeCountryHandler = (selectedOption: Option | null) => {
    setCountry(selectedOption);
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "44px",
      height: "44px",
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: "0 8px",
    }),
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Define the booking data structure according to the Booking model
    const submissionData = {
      bookingId: `booking_${nanoid()}`, // Generate booking ID
      type: expedition?.collections.name,
      startDate: formData.arrivalDate,
      endDate: formData.departureDate,
      adults: 1, // Customize based on your form
      childrens: 0, // Customize based on your form
      paymentMethod: "cash", // Placeholder or set based on your form
      paymentStatus: "pending", // Set default or update based on form
      paymentOption: "full-payment", // Set based on form
      totalAmount: 0, // Example amount
      depositAmount: 0, // Example deposit
      expedition: expedition?._id,
      departure: groupDepartureId,
      additionalServices: [], // Add services array if needed
      travellers: [
        {
          fullName: formData.fullName,
          email: formData.email,
          phone,
          gender: "not specified", // Update as per form data
          dob: new Date(), // Example, replace with form data
          passportNumber: "N/A", // Placeholder or replace with form data
          passportExpiryDate: new Date(), // Placeholder or replace with form data
          nationality: country?.label || "Unknown",
        },
      ],
      message: formData.message,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (response.ok) {
        setLoading(false);
        setIsPopupOpen(true);
        setFormData({
          fullName: "",
          email: "",
          message: "",
          arrivalDate: "",
          departureDate: "",
        });
        setPhone("");
        setCountry(null);
      } else {
        console.error("Failed to submit the booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    router.push("/"); // Redirect to a thank-you page or stay on the form
  };

  useEffect(() => {
    fetchExpedition(slug ?? "");
  }, []);

  return (
    <div className="md:w-9/12 w-11/12 mx-auto h-full relative">
      <section className="py-24">
        <div
          onClick={() => router.back()}
          className="cursor-pointer flex justify-start mb-5"
        >
          <div className="text-zinc-700 hover:scale-105 duration-300 hover:text-zinc-800 flex items-center">
            <Icon icon="ic:outline-arrow-left" className="w-6 h-6" />
            <span className="font-medium ml-2">Back</span>
          </div>
        </div>

        <h1
          className="text-4xl font-extrabold text-center text-secondary-500 mb-8"
          onClick={() => console.log(expedition?.collections.name)}
        >
          Make Your Booking
        </h1>

        <div className="bg-white p-10 rounded-md border border-gray-200">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-5">
              <p className="text-gray-600 flex items-center">
                Please fill out all fields
                <span className="text-red-600 ml-1">*</span>
              </p>
              <div className="relative h-full">
                <Image
                  alt="Form Background"
                  src={FormBg}
                  className="rounded-md relative h-full object-cover"
                />
              </div>
            </div>

            <form className="lg:col-span-2" onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="flex gap-3">
                  <div className="w-full">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-10 border mt-1 rounded px-4 w-full"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@domain.com"
                      className="h-10 border mt-1 rounded px-4 w-full"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-full">
                    <label htmlFor="phone">Phone Number</label>
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      onChange={setPhone}
                      enableSearch
                      placeholder="Enter phone number"
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                      buttonStyle={{
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "43px",
                        paddingLeft: "45px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="country">Country</label>
                    <Select
                      options={options}
                      value={country}
                      styles={customStyles}
                      onChange={changeCountryHandler}
                      placeholder="Select a country"
                      className="text-black text-xs sm:text-base cursor-pointer"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="expedition">Expedition</label>
                  <select
                    name="expedition"
                    id="expedition"
                    className="h-10 border mt-1 rounded px-4 w-full outline-none hover:cursor-not-allowed"
                    required
                    disabled
                  >
                    <option key={expedition?._id} value={expedition?._id}>
                      {expedition?.name}
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="w-full">
                    <label htmlFor="arrivalDate">Arrival Date</label>
                    <input
                      type="date"
                      name="arrivalDate"
                      id="arrivalDate"
                      value={formData.arrivalDate}
                      onChange={handleInputChange}
                      className="h-10 border mt-1 rounded px-4 w-full"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="departureDate">Departure Date</label>
                    <input
                      type="date"
                      name="departureDate"
                      id="departureDate"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      className="h-10 border mt-1 rounded px-4 w-full"
                      required
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message"
                    className="border mt-1 rounded px-4 w-full h-28 resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-primary2 px-12 text-white rounded px-6 py-2 hover:bg-primary2 flex gap-2 justify-center items-center hover:cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? <>Submitting . . . </> : <>Submit</>}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 shadow-lg text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">Booking Successful</h2>
              <p className="mb-6">
                Thank you for your booking! We will get back to you soon.
              </p>
              <button
                onClick={closePopup}
                className="bg-primary2 text-white rounded px-6 py-2 hover:bg-primary2"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookForm;
