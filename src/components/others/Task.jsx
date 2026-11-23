import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { formatDateTime, replaceTaskInData } from "../../utils/helper";
import taskStatusStyles from "./taskStatusStyles";

const taskStatuses = ["New", "Pending", "In Progress", "Completed"];

function Task({ task }) {
  const { setData } = useData();
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusError, setStatusError] = useState("");
  const statusStyles =
    taskStatusStyles[task.status] ?? taskStatusStyles.default;

  async function handleStatusChange(event) {
    const newStatus = event.target.value;
    if (newStatus === task.status) return;

    setStatusError("");
    setIsUpdating(true);

    try {
      const response = await fetch(
        `http://localhost:3001/tasks/${encodeURIComponent(task.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update task status (HTTP ${response.status}).`,
        );
      }

      const updatedTask = await response.json();
      setData((currentData) => replaceTaskInData(currentData, updatedTask));
    } catch (requestError) {
      setStatusError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update task status.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <article
      className="flex min-h-80 w-72 flex-none snap-start flex-col rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-lg transition-colors hover:border-slate-600 sm:w-80"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Task
        </h3>
        <time
          dateTime={task.date}
          className="text-xs text-slate-500"
        >
          {formatDateTime(task.date)}
        </time>
      </div>
      <h2 className="mt-2 text-lg font-semibold text-slate-200">
        {task.title}
      </h2>
      <p className="mt-3 line-clamp-5 text-sm leading-6 text-slate-400">
        <span className="font-medium text-slate-300">Description: </span>
        {task.description}
      </p>
      <div className="mt-auto flex w-full flex-col items-start gap-2">
        <label
          htmlFor={`task-status-${task.id}`}
          className="text-xs font-medium text-slate-400"
        >
          Change status
        </label>
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition-colors focus-within:ring-2 focus-within:ring-blue-400/40 ${statusStyles.badge} ${
            isUpdating ? "opacity-60" : ""
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
          />
          <select
            id={`task-status-${task.id}`}
            aria-label={`Update status for ${task.title}`}
            value={task.status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            style={{ colorScheme: "dark" }}
            className="w-32 cursor-pointer appearance-none bg-transparent text-inherit outline-none disabled:cursor-not-allowed"
          >
            {taskStatuses.map((status) => (
              <option
                key={status}
                value={status}
                className="bg-slate-900 text-slate-100"
              >
                {status}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3 w-3 shrink-0 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M5.22 7.47a.75.75 0 0 1 1.06 0L10 11.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isUpdating && (
          <p role="status" className="text-xs text-slate-400">
            Updating status...
          </p>
        )}
        {statusError && (
          <p role="alert" className="text-xs text-rose-300">
            {statusError}
          </p>
        )}
      </div>
    </article>
  );
}

export default Task;
