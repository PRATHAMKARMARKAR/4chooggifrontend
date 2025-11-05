import React, { useState } from "react";
import { motion } from "framer-motion";

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ value, onChange, placeholder, onKeyPress, className = "" }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    onKeyPress={onKeyPress}
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border shadow-sm ${className}`}>{children}</div>
);

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    jobTitle: "",
    skills: [],
    experience: "",
    locations: [],
    enableAutoApply: true,
  });
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setData({ ...data, skills: [...data.skills, skillInput] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    setData({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleComplete = () => {
    localStorage.setItem("onboarding", JSON.stringify(data));
    alert("Setup Complete! Redirecting to dashboard...");
  };

  const stepsContent = [
    {
      title: "Upload Your Resume",
      description:
        "Upload your resume for AI to analyze and match with opportunities.",
      content: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center hover:border-blue-600 transition-colors cursor-pointer">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-gray-800 font-medium mb-1">
              Drop your resume here
            </p>
            <p className="text-gray-500 text-sm">PDF or DOC format</p>
          </div>
        </div>
      ),
    },
    {
      title: "Job Preferences",
      description: "Tell us what kind of role you're looking for.",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Target Job Title
            </label>
            <Input
              placeholder="e.g., Senior Software Engineer"
              value={data.jobTitle}
              onChange={(e) =>
                setData({ ...data, jobTitle: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Years of Experience
            </label>
            <select
              value={data.experience}
              onChange={(e) =>
                setData({ ...data, experience: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="0-2">0-2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Skills & Expertise",
      description: "Add your key technical skills.",
      content: (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
              className="flex-1"
            />
            <Button onClick={handleAddSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(i)}
                  className="hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Final Settings",
      description: "Configure your preferences.",
      content: (
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-300 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={data.enableAutoApply}
              onChange={(e) =>
                setData({ ...data, enableAutoApply: e.target.checked })
              }
              className="w-5 h-5 rounded accent-blue-600"
            />
            <div>
              <p className="font-medium text-gray-800">Enable Auto Apply</p>
              <p className="text-sm text-gray-500">
                Automatically apply to matching jobs
              </p>
            </div>
          </label>
        </div>
      ),
    },
  ];

  const step = stepsContent[currentStep - 1];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    s <= currentStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Step {currentStep} of 4
            </p>
          </div>

          {/* Step content */}
          <Card className="bg-white border-gray-200 p-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                {step.title}
              </h1>
              <p className="text-gray-500 mb-8">{step.description}</p>
              {step.content}
            </motion.div>
          </Card>

          {/* Navigation buttons */}
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
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
