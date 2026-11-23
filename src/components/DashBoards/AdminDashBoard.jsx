import { useState } from "react";
import AddTaskForm from "../others/AddTaskForm";
import AdminTaskTable from "../others/AdminTaskTable";
import Footer from "../others/Footer";
import Header from "../others/Header";

function AdminDashBoard() {
  const [editTask, setEditTask] = useState(null);

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 px-4 py-3 sm:px-8 lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <Header />
      <main className="mx-auto mt-3 mb-4 flex w-full max-w-7xl flex-1 flex-col gap-3 lg:min-h-0">
        <AddTaskForm
          editTask={editTask}
          setEditTask={setEditTask}
          key={editTask?.id ?? "NewTask"}
        />
        <AdminTaskTable onEditTask={setEditTask} />
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashBoard;
