import axios from "axios";
import { Suspense, lazy, useState } from "react";
import { TaskForm } from "../components/ui/forms";
import { useUserContext } from "../context/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Select } from "../components/ui/selectors";
import { TASK_FILTER } from "../types/task.types";
import { LogoutIcon } from "../assets/svg/svgLinks";
import { filterOptions } from "../utils/constants";
import { useTaskListContext } from "../context/TaskList";

const TaskList = lazy(() => import("../components/TaskList"));

const HomePage = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const { setTaskList } = useTaskListContext();

  const [taskStatusFilter, setTaskStatusFilter] = useState<TASK_FILTER>(
    TASK_FILTER.ALL
  );

  const logOut = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/logout`,
        {
          withCredentials: true,
        }
      );
      setUser(null);
      setTaskList([]);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full p-4">
      <div className="group w-[20px] ml-auto  relative">
        <span
          className="group-hover:opacity-100 transition-opacity bg-gray-100 p-2 text-sm text-gray-600 font-semibold rounded-md absolute left-0 
    -translate-x-1/2 translate-y-full opacity-0 m mx-auto"
        >
          Logout
        </span>
        <img
          onClick={logOut}
          width={20}
          height={20}
          src={LogoutIcon}
          alt="Logout"
          role="button"
          className="rotate-90"
        />
      </div>
      <div className="text-black flex flex-col">
        <h1 className="text-center  text-3xl text-black mt-6 font-bold">
          Welcome {user?.name} 👋,
        </h1>
        <h2 className="text-center  text-gray-600 mt-6 font-semibold">
          Create a new task
        </h2>
        <TaskForm />
        {/* Task List */}
        <h2 className="text-center  text-gray-600 mt-8 font-semibold">
          {" "}
          View your tasks below
        </h2>
        <div className="max-w-[1030px] min-w-[343px] mx-auto">
          <Select
            label="Task Filters"
            value={taskStatusFilter}
            setValue={setTaskStatusFilter}
            options={filterOptions}
          />
          <Suspense
            fallback={
              <p className="text-center text-black mt-6 font-bold">
                Loading task List...
              </p>
            }
          >
            <TaskList taskStatusFilter={taskStatusFilter} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
