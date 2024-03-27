import React from "react";
import Visualization from "./Visualization";
import Data from "./Data";

export default function Results() {
  return (
    <div>
      <div>
        <Visualization />
      </div>
      <div>
        <Data />
      </div>
    </div>
  );
}
