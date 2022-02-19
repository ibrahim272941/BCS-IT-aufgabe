import { onValue, query, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "../../auth/getAuth";

export const useFetch = () => {
  const [data, setData] = useState({});
  const {
    reloadUserInfo: { localId },
  } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const userRef = ref(database, `${localId}`);
    onValue(query(userRef), (snapshot) => {
      setData({ ...snapshot.val() });
    });
  }, []);

  return data;
};
