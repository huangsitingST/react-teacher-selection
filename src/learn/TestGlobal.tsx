// dva global的用法
import { useSelector, useDispatch } from "umi";
const Global: React.FC = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state: any) => state.globalState);


  return (
    <div>
      <div>{globalState.title}</div>
      <div>{globalState.count}</div>
      <button onClick={() => dispatch({ type: "globalState/setTitle", payload: "new title" })}>set title</button>
      <button onClick={() => dispatch({ type: "globalState/setCount" })}>set count</button>
      <button onClick={() => dispatch({ type: "globalState/asyncGetGlobal" })}>async get global</button>
    </div>
  )
};

export default Global;