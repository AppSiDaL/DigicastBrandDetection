import React from "react";
import { Range } from "react-range";

interface ConfidenceInputProps {
  confidece: number;
  setConfidence: React.Dispatch<React.SetStateAction<number>>;
}

export default function ConfidenceInput({
  confidece,
  setConfidence,
}: ConfidenceInputProps) {
  let thumbKey = 0;
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select Confidence
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Range
          values={[confidece]}
          step={1}
          min={0}
          max={100}
          onChange={(values) => setConfidence(values[0])}
          renderTrack={({ props, children }) => {
            thumbKey += 1;
            return (
              <div
                {...props}
                key={thumbKey}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#ccc",
                }}
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props, isDragged }) => {
            thumbKey += 1;
            return (
              <div
                {...props}
                key={thumbKey}
                style={{
                  ...props.style,
                  height: "32px",
                  width: "32px",
                  borderRadius: "4px",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-24px",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                    padding: "2px",
                    borderRadius: "4px",
                    backgroundColor: "#548BF4",
                  }}
                >
                  {confidece.toFixed(1)}
                </div>
                <div
                  style={{
                    height: "16px",
                    width: "5px",
                    backgroundColor: isDragged ? "#548BF4" : "#CCC",
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    </>
  );
}
