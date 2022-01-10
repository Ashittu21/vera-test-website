import { useEffect, useRef, useState } from "react";
import Loading from "./Loading.js";
export default ({ endpoint, children = null, loading = Loading() }) => {
  const controller = useRef();
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem(endpoint))
  );
  useEffect(() => {
    if (controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();
    fetch(endpoint, { signal: controller.current.signal })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem(endpoint, JSON.stringify(data));
        setData(data);
      })
      .catch((err) => {
        console.log(err.name);
      });
  }, [endpoint]);

  if (data.error) {
    return "Error";
  }

  return data ? children(data) : loading;
};
