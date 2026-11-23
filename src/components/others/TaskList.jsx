import { useData } from "../../contexts/DataContext";
import Task from "./Task";

function TaskList() {
  const { data, user } = useData();
  const { tasks = [] } = data ?? {};
  const assignedTasks = tasks.filter((task) => task.assignee === user.name);

  return (
    <section
      aria-label="Tasks"
      className="no-scrollbar mx-auto mt-8 flex w-full max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4"
    >
      {assignedTasks.length === 0 ? (
        <div
          role="status"
          className="flex min-h-48 w-full flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-10 text-center"
        >
          <h2 className="text-base font-semibold text-slate-200">
            No tasks yet
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            Please ask your admin to assign you some tasks.
          </p>
        </div>
      ) : (
        assignedTasks.map((task) => <Task task={task} key={task.id} />)
      )}
    </section>
  );
}

export default TaskList;
