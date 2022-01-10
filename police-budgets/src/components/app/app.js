import React, { useState, useEffect } from "react";
import "./app.scss";
import dataSrc from "./ConsolidatedExp_72PoliceDepartments 12-2-2020.csv";
import { csvParse } from "d3-dsv";
import CitySwitcher from "components/city-switcher";

const App = () => {
  const data = useCsv(dataSrc);
  if (!data) {
    return <div>Loading</div>;
  }
  return <CitySwitcher data={data} />;
};

export default App;

const useCsv = (src) => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((res) => {
        setData(csvParse(res));
      });
  }, [setData, src]);
  return data;
};
