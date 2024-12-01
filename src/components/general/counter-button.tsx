"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";

export const CounterButton = () => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log("intialize");
    return () => {
      console.log("unmount or killed");
    };
  }, []);

  const counterValue = useMemo(() => {
    console.log("memorized value");
    return counter;
  }, [counter]);

  return (
    <div className="grid gap-2">
      <p>Counter : {counterValue}</p>
      <Button onClick={() => setCounter((prev) => prev + 1)}>Click me</Button>
    </div>
  );
};
