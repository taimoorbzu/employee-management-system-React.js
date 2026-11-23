import { useData } from "../../contexts/DataContext";

const taskStatuses = [
  { status: "New", label: "New tasks" },
  { status: "Pending", label: "Pending tasks" },
  { status: "In Progress", label: "In progress" },
  { status: "Completed", label: "Completed" },
];

function TaskSummary() {
  const { data, user } = useData();
  const tasks = (data?.tasks ?? []).filter(
    (task) => task.assignee === user?.name,
  );

  return (
    <section
      aria-label="Task summary"
      className="mx-auto mt-6 grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {taskStatuses.map(({ status, label }) => {
        const count = tasks.filter((task) => task.status === status).length;

        return (
          <div
            key={status}
            className="rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-lg"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-200">
              {count}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-400">{label}</p>
          </div>
        );
      })}
    </section>
  );
}

export default TaskSummary;
