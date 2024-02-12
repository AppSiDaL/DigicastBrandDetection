"use client";
import React from "react";
import NavBar from "../components/NavBar";
import MainCard from "./components/MainCard";
export default function Page() {
  const [server, setServer] = React.useState<string>("inference");
  return (
    <div className=" bg-gray-200">
      <NavBar />
      <MainCard server={server}  setServer={setServer}/>
    </div>
  );
}
