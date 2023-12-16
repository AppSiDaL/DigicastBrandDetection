"use client"
import React from "react";

interface ShowJSONProps {
  response: object[];
}

export default function ShowJSON ({ response }: ShowJSONProps) {
  return (
    <div>
      <h1>Repsonse JSON</h1>
      {JSON.stringify(response)}
    </div>
  );
}
