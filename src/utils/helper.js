const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
});

export function formatDateTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  return `${dateFormatter.format(date)} at ${timeFormatter.format(date)}`;
}

export function getMinimumDateTime() {
  const minimumDate = new Date();
  minimumDate.setSeconds(0, 0);
  minimumDate.setMinutes(minimumDate.getMinutes() + 1);
  // datetime-local expects local wall time, so shift before formatting as ISO.
  const localDate = new Date(
    minimumDate.getTime() - minimumDate.getTimezoneOffset() * 60_000,
  );
  return localDate.toISOString().slice(0, 16);
}

export function addTaskToData(currentData, task) {
  if (!currentData) return currentData;

  return {
    ...currentData,
    tasks: [...(currentData.tasks ?? []), task],
  };
}

export function replaceTaskInData(currentData, updatedTask) {
  if (!currentData) return currentData;

  return {
    ...currentData,
    tasks: (currentData.tasks ?? []).map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    ),
  };
}

export function removeTaskFromData(currentData, taskId) {
  if (!currentData) return currentData;

  return {
    ...currentData,
    tasks: (currentData.tasks ?? []).filter((task) => task.id !== taskId),
  };
}
