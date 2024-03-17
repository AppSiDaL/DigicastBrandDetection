import React from "react";
import { VscJson } from "react-icons/vsc";
interface ResultsProps {
  resultsRef: React.RefObject<HTMLDivElement>;
}

export default function Results({ resultsRef }: ResultsProps) {
  return (
    <div style={{ width: "50%", height: "100%" }} ref={resultsRef}>
      <VscJson
        size={350}
        color="gray"
      />
    </div>
  );
}
