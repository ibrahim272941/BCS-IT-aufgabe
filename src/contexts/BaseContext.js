import { useContext, createContext, useState, useEffect } from "react";

export const BaseContext = createContext();

export const BaseConsumer = BaseContext.Consumer;

export const useBaseContext = () => useContext(BaseContext);

export const BasePovider = (props) => {
  const [ids, setIds] = useState([]);

  const value = { ids, setIds };
  return (
    <BaseContext.Provider value={value}>{props.children}</BaseContext.Provider>
  );
};
