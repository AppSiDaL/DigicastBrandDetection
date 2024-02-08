"use client"
import React, { useState } from "react";
import { Range } from "react-range";

export default function ConfidenceInput() {
  const [value, setValue] = useState([50]);
    
  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Confidence
      </label>

      <Range
        step={1}
        min={0}
        max={100}
        values={value}
        onChange={(values) => setValue(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "22px",
              width: "22px",
              backgroundColor: "#999",
            }}
          />
        )}
      />
    </div>
  );
}
