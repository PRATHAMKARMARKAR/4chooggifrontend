import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import { resume } from "react-dom/server";

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const base = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ value, onChange, placeholder, className = "" }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border shadow-lg ${className}`}>{children}</div>
);

const Onboarding = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [data, setData] = useState({
    title: "",
    skills: [],
    yoe: "",
    github: "",
    linkedin: "",
    portfolio: "",
    autoApply: true,
    resumeURL: "",
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  // ✅ Upload Resume
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select a PDF.");
    if (file.type !== "application/pdf") return alert("Only PDF allowed.");

    setUploading(true);
    try {
      const  res1  = await axios.post(
        "http://localhost:3000/api/users/getSignedUrlResume",
        { id: userId, fileType: "application/pdf" }
      );
      
      
      const uploadURL= res1.data.data.uploadURL;
      const resumeURL = res1.data.data.resumeURL;
  
      
      await axios.put(uploadURL, file, { headers: { "Content-Type": "application/pdf" } });

      setData((prev) => ({ ...prev, resumeURL: publicURL }));
      alert("✅ Resume uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Add & Remove skills
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setData({ ...data, skills: [...data.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };
  const handleRemoveSkill = (i) =>
    setData({ ...data, skills: data.skills.filter((_, x) => x !== i) });

  // ✅ Next step
  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length));

  // ✅ Final API Call
  const handleComplete = async () => {
    setSaving(true);
    try {
      const payload = {
        id: userId,
        resumeURL: resumeURL,
        title: data.title,
        yoe: data.yoe,
        skills: data.skills,
        autoApply: data.autoApply,
        github: data.github,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
      };

      const res = await axios.post(
        "http://localhost:3000/api/users/addDetails",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 201) {
        console.log("✅ Saved:", res.data);
        alert("🎉 Onboarding Complete!");
        localStorage.setItem("onboarding", JSON.stringify(data));

        // ✅ Navigate to login page
        navigate("/login");
      } else {
        alert("Error: Unexpected response from server.");
      }
    } catch (err) {
      console.error("❌ Save failed:", err);
      alert("Error saving details.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Steps
  const steps = [
    {
      title: "Upload Resume",
      content: (
        <div>
          <label
            htmlFor="resumeUpload"
            className="block border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer"
          >
            <div className="text-4xl mb-2">📄</div>
            <p>
              {uploading
                ? "Uploading..."
                : data.resumeURL
                ? "Resume Uploaded ✅"
                : "Upload Resume PDF"}
            </p>
            <input
              id="resumeUpload"
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />
          </label>
        </div>
      ),
    },
    {
      title: "GitHub & LinkedIn",
      content: (
        <div className="space-y-4">
          <Input
            placeholder="GitHub URL"
            value={data.github}
            onChange={(e) => setData({ ...data, github: e.target.value })}
          />
          <Input
            placeholder="LinkedIn URL"
            value={data.linkedin}
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
          />
          <Input
            placeholder="Portfolio URL"
            value={data.portfolio}
            onChange={(e) => setData({ ...data, portfolio: e.target.value })}
          />
        </div>
      ),
    },
    {
      title: "Job Title & Experience",
      content: (
        <div className="space-y-4">
          <Input
            placeholder="Job Title (e.g., Backend Developer)"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <select
            value={data.yoe}
            onChange={(e) => setData({ ...data, yoe: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Years of Experience</option>
            <option value="0-5yrs">0-5yrs</option>
            <option value="5-10yrs">5-10yrs</option>
            <option value="10+yrs">10+yrs</option>
          </select>
        </div>
      ),
    },
    {
      title: "Skills",
      content: (
        <div>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Add a skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <Button onClick={handleAddSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(i)}
                  className="font-bold hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Auto Apply",
      content: (
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={data.autoApply}
            onChange={(e) => setData({ ...data, autoApply: e.target.checked })}
          />
          <span>Enable Auto Apply</span>
        </label>
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
        <Card className="p-8 bg-white">
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
              <Button onClick={handleNext} className="flex-1">
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} className="flex-1">
                {saving ? "Saving..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;
