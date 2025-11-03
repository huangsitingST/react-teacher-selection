
import { createContext } from "react";

export type AppState = {
  name: string;
  age: number;
};

// 使用明确的泛型，并提供可空初始值，便于在未提供 Provider 时进行类型保护
const AppContext = createContext<AppState>({
  name: '',
  age: 0
});

export default AppContext