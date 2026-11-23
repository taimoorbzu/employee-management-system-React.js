import Header from "../others/Header";
import Footer from "../others/Footer";
import TaskList from "../others/TaskList";
import TaskSummary from "../others/TaskSummary";

export default function UserDashBoard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 px-4 py-6 sm:px-8">
      <Header />
      <TaskSummary />
      <TaskList />
      <Footer />
    </div>
  );
}
