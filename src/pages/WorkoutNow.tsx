import React from "react";
import BodyExercise from "./components/BodyExercise";

const WorkOutNow: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 mt-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Work Out Now</h1>
      <p className="text-lg text-gray-700 mb-8">
        Select an exercise category to get started:
      </p>
        <BodyExercise />
    </div>
  );
};

export default WorkOutNow;
