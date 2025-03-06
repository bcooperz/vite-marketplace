import { useState } from "react";
// import test from "../api/test";
import test from "@/api/test";
import { CancellablePromise, abortSymbol } from "../api/axios";

const requests: CancellablePromise<{ message: string }>[] = [];

const Test = () => {
  const [data, setData] = useState<{ message: string } | undefined>();

  const getDataAndSetState = async () => {
    try {
      const request = test.helloWorld.getHelloWorld();
      requests.push(request);

      const data = await request;

      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Test file</h1>
      <button
        onClick={() => {
          const request = requests.pop();
          request?.[abortSymbol]?.abort();
          console.log(request?.[abortSymbol]);
          console.log(requests);
        }}
      >
        cancel last request
      </button>
      <button
        onClick={() => {
          void getDataAndSetState();
        }}
      >
        start new request
      </button>
      <button>start new request</button>
      <br />
      {!data && <span>Loading...</span>}
      {data && JSON.stringify(data)}
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
    </div>
  );
};

export default Test;
