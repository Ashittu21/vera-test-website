import React, { useState } from "react";
import "./city-switcher.scss";
import Select from "react-select";
import Budget from "components/budget";

const CitySwitcher = ({ data }) => {
  const { data: dataByCity, yearByCity, slugTitle } = selectData(data);
  const cityOptions = Object.keys(slugTitle).map((d) => ({
    value: d,
    label: slugTitle[d],
  }));
  const preselectedCity = window.PoliceBudgetCity || null;
  const preselectedOption =
    preselectedCity && cityOptions.find((d) => d.value === preselectedCity);
  const [city, setCity] = useState(
    preselectedOption
      ? preselectedOption.value
      : cityOptions.find(({ value }) => value === "atlanta-ga").value
  );

  const cityLabel = slugTitle[city];
  const budgetYear = yearByCity[city];

  return (
    <div className="CitySwitcher">
      {!preselectedOption && (
        <Select
          options={cityOptions}
          value={cityOptions.find(({ value }) => value === city)}
          onChange={(value) => {
            setCity(value.value);
          }}
        />
      )}
      <Budget
        cityLabel={cityLabel}
        city={city}
        year={budgetYear}
        data={dataByCity[city]}
      />
    </div>
  );
};

export default CitySwitcher;

const selectData = (data) => {
  const slugTitle = {};
  const dataWithIds = data.map((d) => {
    const slug = `${d.city
      .trim()
      .toLowerCase()
      .replace(/\./g, "")
      .replace(/\s/g, "-")}-${d["stateAbb"].trim().toLowerCase()}`;
    if (!slugTitle[slug]) {
      slugTitle[slug] = `${d.city.trim()}, ${d["stateAbb"].trim()}`;
    }
    return {
      ...d,
      uid: `${d.department}-${d.expensecat}-${d.subdep}-${d.expensedescrip}-${d.personneltype}`,
      slug,
      total: parseInt(d.total),
    };
  });
  const dataByCity = dataWithIds.reduce((r, d) => {
    if (!r[d.slug]) {
      r[d.slug] = [];
    }
    r[d.slug].push(d);
    return r;
  }, {});
  const yearByCity = Object.keys(dataByCity).reduce((r, d) => {
    r[d] = dataByCity[d][0].year;
    return r;
  }, {});

  const dataByCategory = organizeBudget(dataByCity);

  console.log(dataByCategory);

  return {
    data: dataByCategory,
    yearByCity,
    slugTitle,
  };
};

const organizeBudget = (data) => {
  return Object.keys(data).reduce((r, city) => {
    r[city] = groupByKey("department", data[city]);
    Object.keys(r[city]).forEach((department) => {
      r[city][department] = groupByKey("expensecat", r[city][department]);

      Object.keys(r[city][department]).forEach((category) => {
        r[city][department][category] = groupByKey(
          "subdep",
          r[city][department][category]
        );

        Object.keys(r[city][department][category]).forEach((subdep) => {
          r[city][department][category][subdep] = groupByKey(
            "expensedescrip",
            r[city][department][category][subdep]
          );

          Object.keys(r[city][department][category][subdep]).forEach(
            (description) => {
              r[city][department][category][subdep][description] = groupByKey(
                "personneltype",
                r[city][department][category][subdep][description]
              );
            }
          );
        });
      });
    });
    return r;
  }, {});
};

const groupByKey = (key, rows) => {
  return rows.reduce((r, d) => {
    if (!r[d[key]]) {
      r[d[key]] = [];
    }
    r[d[key]].push(d);
    return r;
  }, {});
};
