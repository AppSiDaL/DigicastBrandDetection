import React, { useState } from "react";
import Title from "./Title";
import InferenceTabs from "./InferenceTabs";
import ModelSelect from "./ModelSelect";
import ConfidenceInput from "./ConfidenceInput";
import FileUpload from "./FileUpload";
import SourceTabs from "./SourceTabs";
import "./MainCard.css";
import InferenceCard from "./InferenceCard";

export default function MainCard() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  return (
    <div>
      <div className="sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-700 m-5 flex flex-row">
        <div className={`main-card ${isButtonPressed ? "animate" : ""}`}>
        <Title />
        <InferenceTabs />
        <form className="mt-8 space-y-6">
          <ModelSelect />
          <ConfidenceInput />
          <SourceTabs />
          <FileUpload />
          <button
            type="submit"
            onClick={(event) => {
                event.preventDefault();
                console.log("Run Inference");
                setIsButtonPressed(true);
              }}
            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Run Inference
          </button>
        </form>
        </div>
      {isButtonPressed && <InferenceCard />}
      </div>
    </div>
  );
}
