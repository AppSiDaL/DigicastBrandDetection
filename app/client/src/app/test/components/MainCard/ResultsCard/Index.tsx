import React from "react";
import JsonOutput from "./JsonOutput";
interface ResultsCardProps {
    response: any;
}
export default function Index({response}: ResultsCardProps) {
  return (
    <div className="border-dashed border-2 border-sky-500">
      <JsonOutput response={response}/>
    </div>
  );
}
