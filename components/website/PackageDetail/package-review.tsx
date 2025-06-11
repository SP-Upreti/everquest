"use client";
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import { StarIcon, Upload, X, User } from "lucide-react";
import toast from "react-hot-toast";

interface ReviewFormData {
  name: string;
  email: string;
  message: string;
  rating: number;
  expedition: string;
  profileImage: string;
}

interface Review {
  name: string;
  email: string;
  message: string;
  rating: number;
  expedition: string;
  images: string[];
  isVerified?: boolean;
  _id?: string;
}

interface PackageReviewProps {
  expeditionId: string;
}

const PackageReview: React.FC<PackageReviewProps> = ({ expeditionId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    email: "",
    message: "",
    rating: 0,
    expedition: expeditionId,
    profileImage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [profilePreview, setProfilePreview] = useState<string>("");

  // Slider settings for the testimonials carousel
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 825,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  useEffect(() => {
    // Fetch existing reviews for this expedition
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review/by-expiditionId/${expeditionId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setReviewsData(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (expeditionId) {
      fetchReviews();
    }
  }, [expeditionId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    setFormData((prev) => ({
      ...prev,
      rating: selectedRating,
    }));
  };

  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);

    // Create a temporary preview URL
    setProfilePreview(URL.createObjectURL(file));

    // Upload to Cloudinary
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "website"); // Your Cloudinary upload preset

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbbl19osz/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: uploadData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          profileImage: data.secure_url,
        }));
        toast.success("Profile image uploaded successfully");
      } else {
        toast.error("Failed to upload profile image");
        setProfilePreview("");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading profile image");
      setProfilePreview("");
    } finally {
      setIsUploading(false);
    }
  };

  const removeProfileImage = () => {
    setProfilePreview("");
    setFormData((prev) => ({
      ...prev,
      profileImage: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.rating) {
      toast.error("Please fill in all required fields and provide a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            expedition: expeditionId,
          }),
        },
      );

      if (response.ok) {
        toast.success("Review submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
          rating: 0,
          expedition: expeditionId,
          profileImage: "",
        });
        setRating(0);
        setProfilePreview("");

        // Refresh reviews
        const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review/by-expiditionId/${expeditionId}`,
        );
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setReviewsData(data.data || []);
        }
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter reviews to only include verified ones
  const verifiedReviews = reviewsData.filter((review) => review.isVerified);

  return (
    <div className="w-full space-y-10 py-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">What Our Explorers Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Read authentic reviews from fellow travelers who have experienced our
          expeditions
        </p>
      </div>

      {/* Reviews Carousel */}
      <div className="my-8 bg-gray-50 py-10 rounded-xl">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-60">
              <p className="text-gray-500">Loading reviews...</p>
            </div>
          ) : verifiedReviews.length > 0 ? (
            <Slider {...settings}>
              {verifiedReviews.map((review, index) => (
                <div key={index} className="px-2">
                  <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center space-y-4 h-full">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center">
                      {review?.images?.length > 0 ? (
                        <Image
                          src={review.images[0]}
                          alt={`${review.name}'s profile`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-primary-500 font-semibold text-2xl">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-center line-clamp-4">
                      {review.message || "Great experience!"}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-60">
              <p className="text-gray-500 mb-2">No verified reviews yet</p>
              <p className="text-primary-500 font-medium">
                Be the first to share your experience!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review Form Section */}
      <div className="bg-white p-8 rounded-xl border shadow-sm max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">
          Share Your Experience
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                placeholder="Your email"
              />
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Profile Picture
            </label>
            <div className="flex items-center space-x-6">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                {profilePreview ? (
                  <Image
                    src={profilePreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                {profilePreview ? (
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={removeProfileImage}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </button>

                    {isUploading && (
                      <span className="text-sm text-gray-500">
                        Processing...
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="px-4 py-2 bg-primary-50 border border-primary-200 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors cursor-pointer flex items-center w-fit">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileUpload}
                        disabled={isUploading}
                      />
                    </label>
                    {isUploading && (
                      <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG. Max size: 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-10 w-10 cursor-pointer transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {rating > 0
                  ? rating === 1
                    ? "Poor"
                    : rating === 2
                    ? "Fair"
                    : rating === 3
                    ? "Good"
                    : rating === 4
                    ? "Very Good"
                    : "Excellent"
                  : "Select your rating"}
              </span>
            </div>
          </div>

          {/* Review Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Your Review
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              placeholder="Share your experience with this expedition..."
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Your honest feedback helps other travelers make informed
              decisions.
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageReview;
