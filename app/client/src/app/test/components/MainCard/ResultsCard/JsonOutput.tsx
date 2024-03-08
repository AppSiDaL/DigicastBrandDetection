import React from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

interface JsonOutputProps {
  response: string;
}

export default function JsonOutput({ response }: JsonOutputProps) {
  console.log(response)
  let parsedResponse;
  try {
    const jsonStart = response.indexOf('{');
    const jsonResponse = response.slice(jsonStart);
    parsedResponse = JSON.parse(jsonResponse);
  } catch (error) {
    console.error('Error parsing JSON response:', error);
  }
  return (
    <div
      style={{
        maxHeight: "100%",
        marginRight: "10px",
        overflow: "auto",
      }}
    >
      {parsedResponse && <JsonView src={parsedResponse} />}
    </div>
  );
}