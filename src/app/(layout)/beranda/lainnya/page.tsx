"use client";
import { useState } from "react";
import Child from "./child/page";

export default function Lainnya() {
  const [childValue, setChildValue] = useState("");

  const handleChildAction = (value: any) => {
    setChildValue(value);
  };
  const message = "Hello from Parent!";
  return (
    <div>
      <h1>Parent Component</h1>
      <Child onChildAction={handleChildAction} data={message} />

      <p>Value from Child: {childValue}</p>
    </div>
  );
}
