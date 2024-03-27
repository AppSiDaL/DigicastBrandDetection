import Params from "@/components/look/Params";
import Results from "@/components/look/Results";

export default function Look() {
  const border = {
    border: "2.5px",
    borderColor: "#5C5C5C",
    borderStyle: "solid",
    borderRadius: 5,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 10,
          width: "30%",
          height: "100%",
          ...border,
          marginRight: 5,
        }}
      >
        <Params />
      </div>
      <div
        style={{
          width: "70%",
          height: "100%",
          ...border,
          marginLeft: 5,
          overflow: "auto",
        }}
      >
        <Results />
      </div>
    </div>
  );
}
