"use client"
import React from "react";
import NavBar from "../components/NavBar";
import MainCard from "./components/MainCard";
export default function Page() {
  return (
    <div className=" bg-gray-200">
      <NavBar />
      <MainCard />
    </div>
  );
}
