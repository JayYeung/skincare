// src/app/onboarding.tsx
"use client";
import { useState } from "react";

interface QuestionCardProps {
    question: string;
    type: "text" | "checkbox";
    options?: string[];
    onChange: (value: string | string[]) => void;
    onSkip: () => void;
    onBack: () => void;
    isFirst: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    type,
    options,
    onChange,
    onSkip,
    onBack,
    isFirst,
}) => {
    const handleCheckboxChange = (option: string) => {
        onChange((prev: string | string[]) => {
            const array = Array.isArray(prev) ? prev : [];
            if (array.includes(option)) {
                return array.filter((item) => item !== option);
            } else {
                return [...array, option];
            }
        });
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-6">{question}</h2>
            {type === "text" ? (
                <input
                    type="text"
                    className="border border-gray-300 rounded p-3 w-full mb-6"
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {options?.map((option, index) => (
                        <label
                            key={index}
                            className="flex items-center space-x-3"
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <span className="text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}
            <div className="flex justify-between">
                {!isFirst && (
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        onClick={onBack}
                    >
                        Back
                    </button>
                )}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onSkip}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState<any[]>([]);

    const questions = [
        { label: "What's your name?", type: "text" },
        {
            label: "What skin type are you?",
            type: "checkbox",
            options: ["Oily", "Dry", "Combination", "Normal"],
        },
        {
            label: "What is your skin tone?",
            type: "checkbox",
            options: ["Fair", "Light", "Medium", "Dark"],
        },
        {
            label: "What is your gender?",
            type: "checkbox",
            options: ["Male", "Female", "Non-binary", "Prefer not to say"],
        },
        { label: "How old are you?", type: "text" },
    ];

    const handleSkip = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log(responses);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (value: string | string[]) => {
        const updatedResponses = [...responses];
        updatedResponses[currentStep] = value;
        setResponses(updatedResponses);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <QuestionCard
                question={questions[currentStep].label}
                type={questions[currentStep].type}
                options={questions[currentStep].options}
                onChange={handleChange}
                onSkip={handleSkip}
                onBack={handleBack}
                isFirst={currentStep === 0}
            />
        </div>
    );
}
