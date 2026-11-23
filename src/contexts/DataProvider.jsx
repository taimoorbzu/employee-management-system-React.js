import { useEffect, useState } from "react";
import DataContext from "./DataContext";
import {
  readStoredData,
  readStoredUser,
  removeStoredUser,
  saveStoredData,
  saveStoredUser,
} from "../utils/localStorage";

function DataProvider({ children }) {
  const [initialState] = useState(() => ({
    data: readStoredData(),
    user: readStoredUser(),
  }));
  const [user, setUser] = useState(initialState.user);
  const [data, setData] = useState(initialState.data);
  const [loading, setLoading] = useState(initialState.data === null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data !== null) return;

    const controller = new AbortController();

    async function loadData() {
      try {
        const [employeesResponse, tasksResponse] = await Promise.all([
          fetch("http://localhost:3001/employees", {
            signal: controller.signal,
          }),
          fetch("http://localhost:3001/tasks", {
            signal: controller.signal,
          }),
        ]);

        if (!employeesResponse.ok || !tasksResponse.ok) {
          throw new Error("Unable to load employee management data.");
        }

        const [employees, tasks] = await Promise.all([
          employeesResponse.json(),
          tasksResponse.json(),
        ]);

        setData({ employees, tasks });
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => controller.abort();
  }, [data]);

  useEffect(() => {
    if (data !== null) {
      saveStoredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      saveStoredUser(user);
    } else {
      removeStoredUser();
    }
  }, [user]);

  const value = {
    data,
    setData,
    error,
    loading,
    user,
    setUser,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
