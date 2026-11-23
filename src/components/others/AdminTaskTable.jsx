import Fuse from "fuse.js";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { removeTaskFromData } from "../../utils/helper";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskSearch from "./TaskSearch";

function AdminTaskTable({ onEditTask }) {
  const { data, setData } = useData();
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { tasks = [] } = data ?? {};

  const query = searchTerm.trim().toLowerCase();
  const fuse = new Fuse(tasks, {
    keys: ["title", "assignee", "status", "category", "description"],
    threshold: 0.3, // 0 = exact match, 1 = match anything
  });

  const filteredTasks = query ? fuse.search(query).map((r) => r.item) : tasks;

  async function handleDeleteTask(taskId) {
    setDeleteError("");
    setDeletingTaskId(taskId);

    try {
      const response = await fetch(
        `http://localhost:3001/tasks/${encodeURIComponent(taskId)}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete task (HTTP ${response.status}).`);
      }

      setData((currentData) => removeTaskFromData(currentData, taskId));
    } catch (requestError) {
      setDeleteError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to delete task.",
      );
    } finally {
      setDeletingTaskId(null);
    }
  }

  return (
    <section
      aria-labelledby="assigned-tasks-heading"
      className="flex flex-1 flex-col lg:min-h-0"
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3">
          <h2
            id="assigned-tasks-heading"
            className="text-sm font-semibold text-slate-100"
          >
            Assigned Tasks
          </h2>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
            {filteredTasks.length} tasks
          </span>
        </div>
        <div className="ml-auto w-full max-w-md">
          <TaskSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
      {deleteError && (
        <p role="alert" className="mb-2 text-sm text-rose-300">
          Could not delete task: {deleteError}
        </p>
      )}
      <div className="no-scrollbar min-h-0 flex-1 overflow-auto rounded-xl border border-slate-700 bg-slate-800/60">
        {tasks.length === 0 ? (
          <div
            role="status"
            className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center"
          >
            <h3 className="text-base font-semibold text-slate-200">
              No tasks yet
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Please add some new tasks using the form above to get started.
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div
            role="status"
            className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center"
          >
            <h3 className="text-base font-semibold text-slate-200">
              No matching tasks
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Try a different search or clear it to see all tasks.
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-4 rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              Clear search
            </button>
          </div>
        ) : (
          <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 bg-slate-800">
              <tr className="border-b border-slate-700 text-[11px] uppercase tracking-wider text-slate-400">
                <th scope="col" className="px-4 py-3 font-medium">
                  Employee
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Assigned Task
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/70">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="text-slate-300 transition-colors hover:bg-slate-700/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-100">
                    <span className="inline-flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15 text-xs font-semibold text-blue-300">
                        {task.assignee.charAt(0)}
                      </span>
                      {task.assignee}
                    </span>
                  </td>
                  <td className="px-4 py-3">{task.title}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <TaskStatusBadge status={task.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <span className="inline-flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEditTask(task)}
                        type="button"
                        aria-label={`Edit task ${task.title}`}
                        title="Edit task"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/30 text-blue-300 transition-colors hover:bg-blue-400/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m16 4 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label={
                          deletingTaskId === task.id
                            ? `Deleting task ${task.title}`
                            : `Delete task ${task.title}`
                        }
                        title="Delete task"
                        disabled={deletingTaskId === task.id}
                        onClick={() => handleDeleteTask(task.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-400/30 text-rose-300 transition-colors hover:bg-rose-400/10 focus:outline-none focus:ring-2 focus:ring-rose-400/50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3" />
                        </svg>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default AdminTaskTable;
