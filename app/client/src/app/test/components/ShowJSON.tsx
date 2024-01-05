"use client";
import React from "react";

interface ShowJSONProps {
  response: object[];
}

export default function ShowJSON({ response }: ShowJSONProps) {
  const json = JSON.stringify(response);
  if (json != "null") {
    return (
      <div>
        <h1>Response JSON</h1>
        {json && JSON.stringify(response)}
      </div>
    );
  }
  return null;
}
