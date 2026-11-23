const DATA_STORAGE_KEY = "ems-app-data";
const USER_STORAGE_KEY = "ems-app-user";

function readStoredValue(key) {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) return null;

  try {
    return JSON.parse(storedValue);
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function readStoredData() {
  const storedData = readStoredValue(DATA_STORAGE_KEY);
  if (
    storedData &&
    Array.isArray(storedData.employees) &&
    Array.isArray(storedData.tasks)
  ) {
    return storedData;
  }

  if (storedData) localStorage.removeItem(DATA_STORAGE_KEY);
  return null;
}

export function readStoredUser() {
  const storedUser = readStoredValue(USER_STORAGE_KEY);
  if (
    !storedUser ||
    (typeof storedUser.id !== "string" && typeof storedUser.id !== "number") ||
    typeof storedUser.name !== "string" ||
    typeof storedUser.email !== "string" ||
    !["Admin", "Employee"].includes(storedUser.role)
  ) {
    if (storedUser) localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }

  return {
    id: storedUser.id,
    name: storedUser.name,
    email: storedUser.email,
    role: storedUser.role,
  };
}

export function saveStoredData(data) {
  localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
}

export function saveStoredUser(user) {
  // The active-user cache only needs profile fields, not authentication data.
  const { id, name, email, role } = user;
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify({ id, name, email, role }),
  );
}

export function removeStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
}
