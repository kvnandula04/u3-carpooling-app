import React, { useState, useEffect } from "react";

export default function RestAPI(params, template=null, runFlag=true) {
  const [result, setResult] = useState([template]);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };

  const fetchData = async () => {
    try {
      if (runFlag == false || params == null)
        return;
        
      console.log("REST sent: ", params);
      const response = await fetch(
        "http://u3pool.ddns.net:3333/api",
        requestOptions
      );

      if (response.status == "200") {
        if (params.operation == "select" || params.operation == "vehiclelookup") {
          const data = await response.json();
          console.log("REST recv: ", data);
          setResult(data);
        }
        else {
          const data = await response.text();
          console.log("REST recv: ", data);
          setResult(data);
        }
      }
      else {
        const data = await response.text();
        console.warn("REST recv: ", data);     
        setResult(data);
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();

  return result;
}
