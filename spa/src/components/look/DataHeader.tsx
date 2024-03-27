import React from "react";
import { FaTable } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa6";
import { FaChartPie } from "react-icons/fa6";
import { colors } from "@/utils";
export default function DataHeader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#292929",
      }}
    >
      <p style={{ color: "white" }}>Data</p>
      <button style={{ border: "none", color: colors.buttonBackground }}>
        Results
      </button>
      <button style={{ border: "none", color: colors.buttonBackground }}>
        SQL
      </button>
    </div>
  );
}
