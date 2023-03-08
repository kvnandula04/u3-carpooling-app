import React, { useState, useEffect } from "react";

export default function RestAPI(params, template=null) {
  const [result, setResult] = useState([template]);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("REST sent: ", params);
        const response = await fetch(
          "http://u3pool.ddns.net:3333/api",
          requestOptions
        );
        
        if (response.status == "200") {
          const data = await response.json();
          console.log("REST recv: ", data);
          setResult(data);
        }
        else {
          const data = await response.text();
          console.warn("REST recv: ", data);          
        }
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return result;
}
