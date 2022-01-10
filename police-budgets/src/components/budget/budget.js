import React, { useContext, useState } from "react";
import "./budget.scss";
import { H, HDown, LevelContext } from "components/heading";
import useBudgetReducer from "./useBudgetReducer";
import Carrot from "components/carrot";
import Visualization from "components/visualization";
import InputNumber from "react-input-number";

export const formatDollars = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Math.round(value));

const BEFORE_LABEL = "FY2020";
const AFTER_LABEL = "Proposed";

const Budget = ({ data, state, setValue }) => {
  const level = useContext(LevelContext);
  const keys = Object.keys(data).sort(sortByTotal);
  const { changes } = state;

  function sortByTotal(a, b) {
    const aval = getTotal(data[a]);
    const bval = getTotal(data[b]);

    if (aval > bval) {
      return -1;
    } else if (aval < bval) {
      return 1;
    } else {
      return 0;
    }
  }

  if (keys.length === 1 && !Array.isArray(data[keys[0]])) {
    return <Budget data={data[keys[0]]} state={state} setValue={setValue} />;
  }
  return (
    <HDown>
      <div style={{ marginLeft: `${level > 1 ? 1.5 : 0}rem` }}>
        {keys.map((key) => {
          if (Array.isArray(data[key])) {
            const before = getTotal(data[key]);
            const after = getTotal(data[key], changes);
            const uid = data[key][0].uid;

            return (
              <LineItem
                key={key}
                title={key}
                value={changes[uid]}
                setValue={setValue(uid)}
                before={before}
                after={after}
              ></LineItem>
            );
          } else {
            const uid = bottomUid(data[key]); //this is innacurate for large cats, pulling first
            const nextLevel = nextLevelDown(data[key]);
            const before = getTotal(data[key]);
            const after = getTotal(data[key], changes);

            const nextIsParent =
              data[keys[keys.indexOf(key) + 1]] &&
              nextLevelDown(data[keys[keys.indexOf(key) + 1]]);

            return (
              <LineItem
                key={key}
                title={key}
                nextLevel={nextLevel}
                nextIsParent={nextIsParent}
                value={changes[uid]}
                setValue={setValue(uid)}
                before={before}
                after={after}
              >
                {nextLevel && (
                  <div className="PoliceBudget-nested">
                    <Budget
                      data={nextLevel}
                      state={state}
                      setValue={setValue}
                    />
                  </div>
                )}
              </LineItem>
            );
          }
        })}
      </div>
    </HDown>
  );
};

const LineItem = ({
  nextLevel,
  nextIsParent,
  title,
  value,
  setValue,
  before,
  after,
  children,
}) => {
  const [open, setOpen] = useState(!!module.hot);
  const toggleOpen = () => setOpen(!open);
  const hasChange = before !== after;
  return (
    <React.Fragment>
      <div
        className={`PoliceBudget-lineitem ${
          !nextLevel ? "PoliceBudget-lineitem--final" : ""
        } ${nextIsParent ? "PoliceBudget-lineitem--last" : ""} ${
          hasChange ? "PoliceBudget-lineitem--haschange" : ""
        }
        `}
      >
        <div className="PoliceBudget-lineitem-heading">
          {nextLevel ? (
            <button
              className={`PoliceBudget-lineitem-toggle ${
                open ? "is-open" : ""
              }`}
              onClick={toggleOpen}
            >
              <Carrot />
              <H>{title}</H>
            </button>
          ) : (
            <H>{title}</H>
          )}
        </div>
        <div className="PoliceBudget-lineitem-adjust">
          {!nextLevel ? (
            <Adjust value={value} onChange={setValue} />
          ) : (
            !open && (
              <button
                className={`PoliceBudget-lineitem-adjust-toggle ${
                  open ? "is-open" : ""
                }`}
                onClick={toggleOpen}
              >
                Adjust
              </button>
            )
          )}
        </div>
        <div className="PoliceBudget-lineitem-before">
          {formatDollars(before)}
        </div>
        <div className="PoliceBudget-lineitem-after">
          {formatDollars(after)}
        </div>
      </div>
      {open && children}
    </React.Fragment>
  );
};

const Adjust = ({ value, onChange }) => {
  return (
    <div className="PoliceBudget-adjust">
      <div className="PoliceBudget-adjust-input">
        <InputNumber
          min={-100}
          max={100}
          step={1}
          value={value}
          onChange={onChange}
          enableMobileNumericKeyboard
        />
        %
      </div>
    </div>
  );
};

function bottomUid(data) {
  if (Array.isArray(data)) {
    return data[0].uid;
  } else {
    return bottomUid(data[Object.keys(data)[0]]);
  }
}

function nextLevelDown(data) {
  if (Array.isArray(data)) {
    return null;
  }
  const keys = Object.keys(data);
  if (keys.length === 1) {
    return nextLevelDown(data[keys[0]]);
  }
  return data;
}

export const getTotal = (data, changes) => {
  if (Array.isArray(data)) {
    return sumRows(data);
  }
  return Object.values(data).reduce((r, d) => {
    return r + (Array.isArray(d) ? sumRows(d) : getTotal(d, changes));
  }, 0);

  function sumRows(rows) {
    return rows.reduce((r, d) => {
      const co = changes && changes[d.uid] ? 1 - changes[d.uid] / 100 : 1;
      return r + d.total * co;
    }, 0);
  }
};

export default ({ cityLabel, city, data, year }) => {
  const { state, setValue, reset } = useBudgetReducer(city);

  const before = getTotal(data);
  const after = getTotal(data, state.changes);

  const beforeLabel = year ? `FY${year}` : BEFORE_LABEL;

  return (
    <div className="PoliceBudget">
      <div className="PoliceBudget-title">
        <div>Adjust the police budget in</div>
        <h1>{cityLabel}</h1>
      </div>
      <div className="PoliceBudget-main">
        <div className="PoliceBudget-lineitem PoliceBudget-header">
          <div className="PoliceBudget-lineitem-heading">Category</div>
          <div className="PoliceBudget-lineitem-adjust">% Reduction</div>
          <div className="PoliceBudget-lineitem-before">{beforeLabel}</div>
          <div className="PoliceBudget-lineitem-after">{AFTER_LABEL}</div>
        </div>
        <div className="PoliceBudget-budget">
          <Budget data={data} state={state} setValue={setValue} />
        </div>
        <div
          className={`PoliceBudget-lineitem PoliceBudget-lineitem--total ${
            before !== after ? "PoliceBudget-lineitem--haschange" : ""
          }`}
        >
          <div className="PoliceBudget-lineitem-heading">Total</div>
          <div className="PoliceBudget-lineitem-adjust"></div>
          <div className="PoliceBudget-lineitem-before">
            {formatDollars(before)}
          </div>
          <div className="PoliceBudget-lineitem-after">
            {formatDollars(after)}
          </div>
        </div>
      </div>
      <div className="PoliceBudget-visualization">
        <div className="PoliceBudget-totals">
          <Total
            label={beforeLabel}
            value={formatDollars(before)}
            className="PoliceBudget-total-before"
          />
          <Total
            label={AFTER_LABEL}
            value={formatDollars(after)}
            className="PoliceBudget-total-after"
            subvalues={[
              {
                label: "Savings",
                value: formatDollars(before - after),
              },
              {
                label: "Reduction",
                value: `${Math.round((100 * (before - after)) / before)}%`,
              },
            ]}
          />
        </div>
        <button className="PoliceBudget-reset btn" onClick={() => reset()}>
          reset
        </button>
        {/* <Visualization data={data} /> */}
      </div>
    </div>
  );
};

const Total = ({ label, value, subvalues, className = "", isTop = true }) => {
  return (
    <div
      className={`PoliceBudget-total ${
        isTop ? "PoliceBudget-total--top" : "PoliceBudget-total--subvalue"
      }  ${className}`}
    >
      <div className="PoliceBudget-total-label">{label}</div>
      <div className="PoliceBudget-total-value">{value}</div>
      {subvalues && (
        <div className="PoliceBudget-total-subvalues">
          {subvalues.map((d) => (
            <Total key={d.label} {...d} isTop={false} />
          ))}
        </div>
      )}
    </div>
  );
};
