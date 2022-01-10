import React, { useMemo } from "react";
import "./visualization.scss";
import { Treemap } from "react-vis";
import { getTotal, formatDollars } from "components/budget";

const Visualization = ({ data }) => {
  const nested = useMemo(() => nestData("Police Budget", data), [data]);
  //const [parent, setParent] = useState(null);
  // useEffect(() => {
  //   setCurrent(flatTree(nested));
  // }, [nested]);

  console.log(nested);

  return (
    <div style={{ position: "sticky", top: "100px", maxHeight: "100vh" }}>
      <button
        onClick={() => {
          // if (parent) {
          //   setCurrent(parent);
          // }
        }}
      >
        back
      </button>
      <Treemap
        title={"My New Treemap"}
        width={250}
        height={window.innerHeight * 0.5}
        data={nested}
        renderMode={"DOM"}
        mode={"partition"}
        animation
        // onLeafClick={(e) => {
        //   if (e.data.deeper) {
        //     setCurrent(e.data.deeper);
        //     setParent(e.data);
        //   }
        // }}
        style={{
          border: "thin solid #ddd",
        }}
      />
    </div>
  );
};

export default Visualization;

// function flatTree(data) {
//   if (data.children) {
//     return {
//       title: data.title,
//       children: data.children.map((d) => ({
//         ...flatten(d),
//         deeper: flatTree(d),
//       })),
//     };
//   } else {
//     return data;
//   }
// }

// function flatten(data) {
//   return {
//     title: data.title,
//     size:
//       typeof data.size !== "undefined"
//         ? data.size
//         : totalChildren(data.children),
//   };
// }

// function totalChildren(data) {
//   return data.reduce((r, { size, children }) => {
//     if (typeof size !== "undefined") {
//       return r + size;
//     } else {
//       return r + totalChildren(children);
//     }
//   }, 0);
// }

const nestData = (title, data) => {
  return Object.keys(data).reduce(
    (r, d) => {
      const total = getTotal(data[d]);
      const label = (
        <div>
          {d} : {formatDollars(total)}
        </div>
      );
      if (Array.isArray(data[d]) || Object.keys(data[d]).length === 1) {
        r.children.push({
          title: d,
          color: "#000000",
          size: total,
        });
      } else {
        r.children.push({
          title: d,
          //size: total,
          color: "#000000",
          children: makeChildren(data[d]),
        });
      }
      return r;
    },
    {
      title,
      color: "#000000",
      children: [],
    }
  );
};

// function nest(data) {
//   return Object.keys(data).reduce((r, d) => {
//     const total = getTotal(data[d]);
//     const label = (
//       <div>
//         {d} : {formatDollars(total)}
//       </div>
//     );
//     if (Array.isArray(data[d]) || Object.keys(data[d]).length === 1) {
//       r.children.push({
//         title: d,
//         color: "#000000",
//         size: total,
//       });
//     } else {
//       r.children.push({
//         title: d,
//         //size: total,
//         color: "#000000",
//         children: makeChildren(data[d]),
//       });
//     }
//     return r;
//   }, {});
// }

function makeChildren(data) {
  return Object.keys(data).map((key) => {
    const total = getTotal(data[key]);

    if (Array.isArray(data[key]) || Object.keys(data[key]).length === 1) {
      return {
        title: key,
        size: total,
        color: "#000000",
      };
    } else {
      return {
        title: key,
        children: Array.isArray(data[key])
          ? data[key].map(({ total }) => {
              return {
                size: +total,
                title: key,
                color: "#000000",
              };
            })
          : makeChildren(data[key]),
      };
    }
  });
}

// const Label = (key, total) => (
//   <div>
//     {key} : {formatDollars.format(total)}
//   </div>
// );
