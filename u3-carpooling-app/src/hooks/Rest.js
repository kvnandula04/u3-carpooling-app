import React, { useState, useEffect } from "react";

export default function RestAPI(params) {
  const [result, setResult] = useState({
    licenceID: "",
    poolID: "",
  });

  // simply change the body, with the appropriate key-val pairs
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // adapt this body for purposes
    body: JSON.stringify(params),
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://u3pool.ddns.net:3333/api",
        requestOptions
      );
      const data = await response.json();
      // console.log("DATA: ", data);
      // console.log("DATA[0]: ", data[0]);
      setResult(data[0]);
    };
    fetchData();
  }, []);

  // console.log("RESULT: ", result);

  return result;
}
