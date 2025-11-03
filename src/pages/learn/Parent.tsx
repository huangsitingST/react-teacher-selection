import { useMemo, useState, useCallback } from "react";
import Child from "./Child";
import { Button } from "antd";
import request from "umi-request";
const Parent: React.FC = () => {
  const [state, setState] = useState<{ name: string; age: number }>({
    name: "John",
    age: 20,
  });
  const getDoubleAge = useMemo(() => {
    return state.age * 2;
  }, [state.age]);

  const handleClick = useCallback(() => {
    console.log("子组件按钮点击");
  }, []);


  const getUser = async () => {
    const response = await request.get("/api/users");
    console.log(response);
  }
  getUser();

  console.log("parent");

  return (
    <>
      <div>Parent</div>
      {getDoubleAge}
      <Button onClick={() => setState({ ...state, age: state.age + 1 })}>
        Add Age
      </Button>
      <Button onClick={() => setState({ ...state, name: state.name + "1" })}>
        Add Name
      </Button>
      <Child onClick={handleClick} />
    </>
  );
};

export default Parent;
