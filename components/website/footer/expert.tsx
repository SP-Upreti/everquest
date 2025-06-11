"use client";
import { useState } from "react";
import Image from "next/image";
interface Expert {
  img: string;
  name: string;
  desc: string;
  email: string;
}
const ExpertList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [subject, setSubject] = useState("Consultation Request");
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null); // Type as Expert | null
  const [message, setMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderCell, setSenderCell] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null); // New state for error handling

  const openModal = (expert: any) => {
    setSelectedExpert(expert);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedExpert(null);
    setSubject("Consultation Request");
    setMessage("");
    setSenderEmail("");
    setSenderCell("");
    setIsSending(false);
    setError(null);
  };

  const sendEmail = async () => {
    if (!senderEmail) {
      setError("Please enter your email address");
      return;
    }
    if (!senderCell) {
      setError("Please enter your Contact Number");
      return;
    }
    if (!message) {
      setError("Please enter your message");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail,
          senderCell,
          receiverEmail: selectedExpert?.email,
          subject,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsSending(false);
      setIsOpen(false);
      setSuccessModal(true);
    } catch (err) {
      setIsSending(false);
      setError("Failed to send email. Please try again.");
    }
  };

  const expertdata = [
    {
      img: "/Guides/Guide.jpg",
      name: "Prem Gurung",
      desc: "IFMGA Mountain Guide & Founder",
      email: "info@infinityadventurenepal.com",
    },
    {
      img: "/Guides/guide4.webp",
      name: "Mike Lim",
      desc: "Adventure Consultant",
      email: "info@infinityadventurenepal.com",
    },
    {
      img: "/Guides/doctor.jpg",
      name: "Dr. Santosh Timalsina ",
      desc: "High Mountain Medicine",
      email: "info@infinityadventurenepal.com",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {expertdata.map((itemex, index) => (
        <div
          key={index}
          className="flex gap-4 md:w-[24em] w-[18em] items-center bg-zinc-800 rounded-md p-2"
        >
          <Image
            src={itemex.img}
            alt="expert-image"
            width={1000}
            height={1000}
            className="md:w-28 md:h-28 w-16 h-16 rounded-full object-cover object-center"
          />
          <div>
            <h2 className="font-bold md:text-xl">{itemex.name}</h2>
            <p className="md:text-sm text-xs italic mb-2">{itemex.desc}</p>
            <button
              onClick={() => openModal(itemex)}
              className="px-4 py-1 font-medium text-sm rounded-md bg-primary2 hover:bg-primary2/90 ease-in-out duration-300"
            >
              Consult Now
            </button>
          </div>
        </div>
      ))}

      {/* Email Modal */}
      {isOpen && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black z-[50] relative p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              Consult {selectedExpert.name}
            </h2>

            <label className="block mb-2 text-sm font-medium">
              Your Email:
            </label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="your@email.com"
              required
            />

            <label className="block mb-2 text-sm font-medium">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block mb-2 text-sm font-medium">
              Your Contact:
            </label>
            <input
              type="number"
              value={senderCell}
              onChange={(e) => setSenderCell(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <label className="block mb-2 text-sm font-medium">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows={3}
              required
            ></textarea>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex justify-between gap-4 w-full">
              <button
                onClick={closeModal}
                className="px-2 w-full py-2 bg-red-400 text-white rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={sendEmail}
                disabled={isSending}
                className={`px-2 w-full py-2 rounded-md text-white ${
                  isSending ? "bg-gray-400" : "bg-primary2 hover:bg-primary2/90"
                }`}
              >
                {isSending ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Email Sent Successfully!</h2>
            <p className="text-sm mb-4">
              Your consultation request has been sent to {selectedExpert?.name}{" "}
              from {senderEmail}.
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="px-4 py-2 bg-primary2 text-white rounded-md hover:bg-primary2/90"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertList;
