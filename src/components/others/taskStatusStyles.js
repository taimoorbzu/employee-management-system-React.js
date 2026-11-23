const taskStatusStyles = {
  New: {
    badge: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-300",
  },
  "In Progress": {
    badge: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    dot: "bg-yellow-400",
  },
  Pending: {
    badge: "border-red-400/30 bg-red-400/10 text-red-300",
    dot: "bg-red-400",
  },
  Completed: {
    badge: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    dot: "bg-blue-400",
  },
  default: {
    badge: "border-slate-500/30 bg-slate-500/10 text-slate-300",
    dot: "bg-slate-400",
  },
};

export default taskStatusStyles;
