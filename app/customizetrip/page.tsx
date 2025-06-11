"use client";
import React, { ChangeEvent, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCollections } from "@/context/Collections";
import PhoneInput, { CountryData } from "react-phone-input-2";

interface Option {
  value: string;
  label: string;
}

interface Expedition {
  _id: string;
  name: string;
  subheading?: string;
  maxElevation?: string;
  banner?: string;
  description?: string;
  expeditions?: Expedition[];
  categoryId?: string;
  slug?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  expeditions: Expedition[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  image: any[];
}

interface OrganizedData {
  [key: string]: Category[];
}
interface FormErrors {
  fullName: string;
  email: string;
  number: string;
  message: string;
  arrivalDate: string;
  departureDate: string;
}
const Page = () => {
  const Router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state

  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "44px",
      height: "44px",
      background: "transparent"
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: "0 8px",
    }),
  };

  const [value, setValue] = useState<Option | null>(null);
  const options = countryList().getData(); // Get the list of countries

  const changeHandler = (value: Option | null) => {
    setValue(value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submissionData = {
      startDate: formData.arrivalDate,
      endDate: formData.departureDate,
      adults: 1, // Customize based on your form
      childrens: 0, // Customize based on your form
      paymentMethod: "cash", // Placeholder or set based on your form
      paymentStatus: "pending", // Set default or update based on form
      paymentOption: "full-payment", // Set based on form
      totalAmount: 0, // Example amount
      depositAmount: 0, // Example deposit
      expedition: selectedExpedition,
      phone: formData.number,
      travelDate: formData.arrivalDate,
      email: formData.email,
      accomodation: formData.message,
      noOfTravelers: 1,
      fullName: formData.fullName,
      message: formData.message,
      country: value?.label,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/custom-trip`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (response.ok) {
        // setLoading(false);
        setIsPopupOpen(true);
        setFormData({
          fullName: "",
          number: "",
          email: "",
          message: "",
          arrivalDate: "",
          departureDate: "",
        });
        setValue(null);
      } else {
        console.error("Failed to submit the booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // setIsPopupOpen(true); // Show popup on submit
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    Router.push("/"); // Redirect to home page
  };
  const [organizedData, setOrganizedData] = useState<OrganizedData>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedExpedition, setSelectedExpedition] = useState<string>("");
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    number: "",
    email: "",
    message: "",
    arrivalDate: "",
    departureDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    number: "",
    email: "",
    message: "",
    arrivalDate: "",
    departureDate: "",
  });

  const { collections } = useCollections();

  // Organize data when collections change
  useEffect(() => {
    if (!collections || !collections.length) return;

    const categoryMap = new Map();

    collections.forEach((item) => {
      if (!item.collections) return;

      const collectionName = item.collections.name.toLowerCase();

      if (!categoryMap.has(collectionName)) {
        categoryMap.set(collectionName, []);
      }

      categoryMap.get(collectionName).push({
        id: item.categoryId,
        name: item.name,
        slug: item.slug,
        description: item.description,
        expeditions: item.expeditions || [],
        _id: item._id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        image: item.image || [],
      });
    });

    const organized: OrganizedData = {};
    categoryMap.forEach((categories, collectionName) => {
      organized[collectionName] = categories;
    });

    setOrganizedData(organized);
    if (Object.keys(organized).length > 0) {
      setSelectedCategory(Object.keys(organized)[0]);
    }
  }, [collections]);

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory && organizedData[selectedCategory]) {
      setSubCategories(organizedData[selectedCategory]);
      setSelectedSubCategory("");
      setSelectedExpedition("");
    }
  }, [selectedCategory, organizedData]);

  // Update expeditions when subcategory changes
  useEffect(() => {
    if (selectedSubCategory) {
      const category = subCategories.find(
        (cat) => cat.id === selectedSubCategory
      );
      if (category && category.expeditions) {
        setExpeditions(category.expeditions);
        setSelectedExpedition("");
      }
    }
  }, [selectedSubCategory, subCategories]);

  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleExpeditionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedExpedition(e.target.value);
  };

  const handleInputChange = (
    value: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    // Check if this is a PhoneInput change event
    if (typeof value === "string") {
      // Handle PhoneInput change
      setFormData((prev) => ({
        ...prev,
        number: value,
      }));
      if (errors.number) {
        setErrors((prev) => ({
          ...prev,
          number: "",
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

  return (
    <main className="bg-[url('/Hero.avif')] bg-cover bg-fixed bg-center bg-black/60 opacity-100 bg-blend-darken">
      <div className="lg:w-8/12 w-11/12 mx-auto py-20">
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-clip-padding bg-[#121212]  md:p-8 p-2 rounded-md"
        >
          <h2
            className="title uppercase font-extrabold text-center lg:text-3xl md:text-2xl text-lg whitespace-nowrap"
            onClick={() => {
              console.log("first", formData, value, selectedExpedition);
            }}
          >
            Customize your trip
          </h2>

          <h2 className="title mt-6 uppercase font-extrabold md:text-xl text-md border-b-4 w-fit border-primary2/50">
            Personal Details
          </h2>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mt-10">
            <div className="flex flex-col gap-2">
              <label className="md:text-md text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border-2 outline-primary2 rounded-md p-2 bg-transparent text-black"
                required
              />
            </div>


            <div className="flex flex-col gap-2">
              <label className="md:text-md text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-2 outline-primary2 rounded-md p-2 bg-transparent text-black"
                required
              />
            </div>


            <div className="flex flex-col gap-2">
              <label className="md:text-md text-sm font-semibold">
                Phone No
              </label>
              <div className="w-full">
                <PhoneInput
                  country={"us"}
                  value={formData.number}
                  onChange={(value) =>
                    handleInputChange(value)
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
                    borderColor: errors.number ? "#ef4444" : "#ccc", // Add error styling
                  }}
                />
                {errors.number && (
                  <p className="mt-1 text-xs text-red-500">{errors.number}</p>
                )}
              </div>


            </div>
            <div className="flex flex-col gap-2">
              <label className="md:text-md text-sm font-semibold">
                Country
              </label>
              <Select
                options={options}
                value={value}
                styles={customStyles}
                onChange={changeHandler}
                placeholder="Select a country"
                className="text-black  fill-transparent text-xs sm:text-base bg-transparent"
              />
            </div>
          </section>
          <div className="mt-10">
            <h2 className="title uppercase font-extrabold md:text-xl text-md border-b-4 w-fit border-primary2/50">
              Trip Details
            </h2>

            <div className="mt-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="w-full">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="h-10 border mt-1 rounded px-4 w-full outline-none bg-transparent"
                    required
                  >
                    <option value="">Select a Category</option>
                    {Object.keys(organizedData).map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label htmlFor="subCategory">Sub-Category</label>
                  <select
                    name="subCategory"
                    id="subCategory"
                    value={selectedSubCategory}
                    onChange={handleSubCategoryChange}
                    className="h-10 border mt-1 rounded px-4 w-full outline-none bg-transparent fill-transparent"
                    required
                  >
                    <option value="">Select a Sub-Category</option>
                    {subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="expedition">Expedition</label>
                <select
                  name="expedition"
                  id="expedition"
                  value={selectedExpedition}
                  onChange={handleExpeditionChange}
                  className="h-10 border mt-1 rounded px-4 w-full outline-none bg-transparent"
                  required
                >
                  <option value="">Select an Expedition</option>
                  {expeditions.map((expedition) => (
                    <option key={expedition._id} value={expedition._id}>
                      {expedition.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-3">
                <div className="w-full">
                  <label htmlFor="arrivalDate">Arrival Date</label>
                  <input
                    type="date"
                    id="arrivalDate"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full outline-none bg-transparent"
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="departureDate">Departure Date</label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="h-10 border mt-1 rounded px-4 w-full outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="h-32 border mt-1 rounded px-4 w-full outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-start">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="border-2 border-primary2/50 font-bold px-10 py-3  rounded-md bg-primary2 hover:bg-primary2 text-white hover:border-white"
            >
              Submit
            </motion.button>
          </div>
        </form>

        {/* Popup */}
        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
              >
                <h2 className="text-2xl font-bold">Form Submitted!</h2>
                <p className="mt-4">Thank you for customizing your trip.</p>
                <button
                  className="mt-6 px-4 py-2 bg-primary2 text-white rounded hover:bg-primary3"
                  onClick={closePopup}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Page;
function nanoid() {
  throw new Error("Function not implemented.");
}
