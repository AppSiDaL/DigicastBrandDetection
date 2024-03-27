import React from "react";
import { Search } from "./Search";
import { SelectClass } from "./SelectClass";
import { SelectTable } from "./SelectTable";
import Filters from "./Filters";

export default function Params() {
  return (
    <div>
      <Search />
      <SelectClass />
      <SelectTable />
      <Filters />
    </div>
  );
}
