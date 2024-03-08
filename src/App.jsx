import { useState } from "react";

import "./App.css";
import Table from "./components/tabledata/Table";
import TableInput from "./components/tableinput/TableInput";

function App() {
  const [inputChange, setInputChange] = useState(false);
  return (
    <>
      <div className="conatiner">
        <h1>User Data</h1>
        <TableInput setInputChange={setInputChange} inputChange={inputChange}  />
        <Table inputChange={inputChange} />
      </div>
    </>
  );
}

export default App;
