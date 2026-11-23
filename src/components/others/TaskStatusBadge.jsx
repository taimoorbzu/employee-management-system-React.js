import taskStatusStyles from "./taskStatusStyles";

function TaskStatusBadge({ status }) {
  const styles = taskStatusStyles[status] ?? taskStatusStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
}

export default TaskStatusBadge;
