import React from "react";
import { FaTable } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa6";
import { FaChartPie } from "react-icons/fa6";
import { colors } from "@/utils";
export default function VisualizationHeader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#292929",
      }}
    >
      <p style={{ color: "white" }}>Visualization</p>
      <button style={{ border: "none" }}>
        <FaTable color={colors.buttonBackground} />
      </button>
      <button style={{ border: "none" }}>
        <FaChartSimple color={colors.buttonBackground} />
      </button>
      <button style={{ border: "none" }}>
        <FaChartBar color={colors.buttonBackground} />
      </button>
      <button style={{ border: "none" }}>
        <FaChartLine color={colors.buttonBackground} />
      </button>
      <button style={{ border: "none" }}>
        <FaChartArea color={colors.buttonBackground} />
      </button>
      <button style={{ border: "none" }}>
        <FaChartPie color={colors.buttonBackground} />
      </button>
    </div>
  );
}
