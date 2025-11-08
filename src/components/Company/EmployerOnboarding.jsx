import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Reusable Button Component
const Button = ({ children, onClick, variant = "default", className = "", disabled }) => {
  const base = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${
        disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

// ✅ Reusable Input Component
const Input = ({ value, onChange, placeholder, className = "" }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

// ✅ Card Wrapper
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border shadow-lg bg-white ${className}`}>{children}</div>
);

const EmployerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ Include idCardURL & uploadURL in state
  const [data, setData] = useState({
    companyName: "",
    companyLocation: "",
    position: "",
    linkedin: "",
    idCardURL: "",
    uploadURL: "",
  });

  const userId = localStorage.getItem("userId");

  // ✅ Upload ID Card (PDF or Image)
  const handleIDCardUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select an image or PDF.");
    if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type))
      return alert("Only PNG, JPG, or PDF allowed.");

    setUploading(true);
    try {
      // Step 1: Request signed URL from backend
      const res = await axios.post("http://localhost:3000/api/employers/getSignedURLIDCard", {
        id: userId,
        fileType: file.type,
      });

      console.log("Signed URL Response:", res.data.data.publicURL);

      const uploadURL = res.data.data.uploadURL;
      const idCardURL = res.data.data.publicURL;

      // Step 2: Upload file to the storage
      await axios.put(uploadURL, file, { headers: { "Content-Type": file.type } });

      // ✅ Step 3: Save URLs in useState
      setData((prev) => ({
        ...prev,
        uploadURL,
        idCardURL,
      }));

      alert("✅ ID Card uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Final API Call to Save Employer Info
  const handleComplete = async () => {
    setSaving(true);
    try {
      const payload = {
        id: userId,
        idCardURL: data.idCardURL,
        linkedin: data.linkedin,
        companyName: data.companyName,
        companyLocation: data.companyLocation,
        position: data.position,
      };

      console.log("🟢 Sending payload:", data.idCardURL);

      const res = await axios.post(
        "http://localhost:3000/api/employers/addDetailsRegister",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        alert("🎉 Employer Onboarding Complete!");
        localStorage.setItem("employerOnboarding", JSON.stringify(data));
        navigate("/login");
      } else {
        alert("Unexpected server response.");
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving details.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Steps for Employer Onboarding
  const steps = [
    {
      title: "Upload Company ID Card",
      content: (
        <div>
          <label
            htmlFor="idCardUpload"
            className="block border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer"
          >
            <div className="text-4xl mb-2">🪪</div>
            <p>
              {uploading
                ? "Uploading..."
                : data.idCardURL
                ? "ID Card Uploaded ✅"
                : "Upload ID Card (PDF or Image)"}
            </p>
            <input
              id="idCardUpload"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleIDCardUpload}
              className="hidden"
            />
          </label>
        </div>
      ),
    },
    {
      title: "Company Details",
      content: (
        <div className="space-y-4">
          <Input
            placeholder="Company Name"
            value={data.companyName}
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
          />
          <Input
            placeholder="Company Location"
            value={data.companyLocation}
            onChange={(e) => setData({ ...data, companyLocation: e.target.value })}
          />
          <Input
            placeholder="Position (e.g., HR, Recruiter, Cashier)"
            value={data.position}
            onChange={(e) => setData({ ...data, position: e.target.value })}
          />
        </div>
      ),
    },
    {
      title: "LinkedIn Profile",
      content: (
        <div>
          <Input
            placeholder="LinkedIn URL"
            value={data.linkedin}
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
          />
        </div>
      ),
    },
  ];

  const step = steps[currentStep - 1];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">{step.title}</h2>
          {step.content}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
            )}
            {currentStep < steps.length ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1">
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} className="flex-1" disabled={saving}>
                {saving ? "Saving..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmployerOnboarding;
