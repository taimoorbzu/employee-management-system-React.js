import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import {
  addTaskToData,
  getMinimumDateTime,
  replaceTaskInData,
} from "../../utils/helper";

const labelClassName = "block text-xs font-medium text-slate-400";
const inputClassName =
  "mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40";

function AddTaskForm({ editTask, setEditTask }) {
  const { data, setData, loading, error } = useData();
  const { employees = [] } = data ?? {};
  const employeesToAssign = employees.filter(
    (employee) => employee.role === "Employee",
  );

  const [title, setTitle] = useState(editTask?.title ?? "");
  const [taskDate, setTaskDate] = useState(editTask?.date.slice(0, 16) ?? "");
  const [assignee, setAssignee] = useState(editTask?.assignee ?? "");
  const [category, setCategory] = useState(editTask?.category ?? "");
  const [description, setDescription] = useState(editTask?.description ?? "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const minimumDateTime = getMinimumDateTime();

  const isEditMode = Boolean(editTask);

  const buttonText = isEditMode
    ? isSubmitting
      ? "Saving Changes..."
      : "Save Changes"
    : isSubmitting
      ? "Creating Task..."
      : "Create Task";

  async function handleCreateTask(e) {
    e.preventDefault();

    setFormError("");
    setSuccessMessage("");

    if (
      !title.trim() ||
      !taskDate ||
      !assignee ||
      !category.trim() ||
      !description.trim()
    ) {
      setFormError("Please complete all task fields.");
      return;
    }

    const dueDate = new Date(taskDate);
    const isUnchangedDueDate =
      isEditMode && taskDate === editTask.date.slice(0, 16);
    if (
      Number.isNaN(dueDate.getTime()) ||
      (!isUnchangedDueDate && dueDate.getTime() <= Date.now())
    ) {
      setFormError("Choose a due date and time in the future.");
      return;
    }

    setIsSubmitting(true);

    const url = isEditMode
      ? `http://localhost:3001/tasks/${encodeURIComponent(editTask.id)}`
      : "http://localhost:3001/tasks";

    const payload = {
      assignee,
      title: title.trim(),
      date: taskDate,
      category: category.trim(),
      description: description.trim(),
      ...(isEditMode ? {} : { status: "New" }),
    };

    try {
      const response = await fetch(url, {
        method: isEditMode ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditMode ? "update" : "create"} task (HTTP ${response.status}).`,
        );
      }

      const savedTask = await response.json();

      setData((currentData) =>
        isEditMode
          ? replaceTaskInData(currentData, savedTask)
          : addTaskToData(currentData, savedTask),
      );

      if (isEditMode) {
        setEditTask(null);
      } else {
        setTitle("");
        setTaskDate("");
        setAssignee("");
        setCategory("");
        setDescription("");
        setSuccessMessage("Task created successfully.");
      }
    } catch (requestError) {
      setFormError(
        requestError instanceof Error
          ? requestError.message
          : `Unable to ${isEditMode ? "update" : "create"} task.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="w-full shrink-0">
      <form
        className="w-full rounded-lg border border-slate-700 bg-slate-800/60 p-3"
        onSubmit={handleCreateTask}
      >
        {(formError || error) && (
          <p
            role="alert"
            className="mb-2 rounded-md border border-rose-400/20 bg-rose-400/5 px-3 py-2 text-sm text-rose-300"
          >
            {formError ||
              "Employee data could not be loaded. Make sure JSON Server is running."}
          </p>
        )}
        {successMessage && (
          <p
            role="status"
            className="mb-2 rounded-md border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-sm text-emerald-300"
          >
            {successMessage}
          </p>
        )}
        <div className="grid gap-60 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-1.5">
            <div>
              <label htmlFor="task-title" className={labelClassName}>
                Task Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type="text"
                id="task-title"
                name="taskTitle"
                placeholder="Make a UI Design"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="task-date" className={labelClassName}>
                Date
              </label>
              <input
                min={minimumDateTime}
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                required
                type="datetime-local"
                id="task-date"
                name="date"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="assign-to" className={labelClassName}>
                Assign To
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                name="assign-to"
                id="assign-to"
                required
                className={`${inputClassName} cursor-pointer`}
              >
                <option value="">Select an employee</option>
                {employeesToAssign.map((employee) => (
                  <option value={employee.name} key={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category" className={labelClassName}>
                Category
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                type="text"
                id="category"
                name="category"
                placeholder="Design, Dev, etc."
                className={inputClassName}
              />
            </div>
          </div>

          <div className="flex min-h-40 flex-col">
            <label htmlFor="description" className={labelClassName}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              id="description"
              name="description"
              placeholder="Describe the task..."
              className="mt-1 min-h-23 w-full flex-1 resize-y rounded-md border border-slate-700 bg-slate-900 px-2.5 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40"
            />
            <div className={`mt-2 flex ${isEditMode ? "gap-2" : ""}`}>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  loading ||
                  Boolean(error) ||
                  employeesToAssign.length === 0
                }
                className={`self-end rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isEditMode ? "flex-1" : "w-full"
                }`}
              >
                {buttonText}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setEditTask(null)}
                  className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;
