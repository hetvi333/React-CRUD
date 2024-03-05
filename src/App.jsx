import { useState } from "react";

import "./App.css";
import Table from "./components/tabledata/Table";
import TableInput from "./components/tableinput/TableInput";

function App() {
  return (
    <>
      <div className="conatiner">
        <h1>User Data</h1>
        <TableInput />
        <Table />
      </div>
    </>
  );
}

export default App;
