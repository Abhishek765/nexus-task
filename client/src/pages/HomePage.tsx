import axios from "axios";
import { Suspense, lazy } from "react";
import { PrimaryButton } from "../components/ui/buttons";
import { TaskForm } from "../components/ui/forms";
import { useUserContext } from "../context/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TaskList = lazy(() => import("../components/TaskList"));

// TODO: home page complete -> mainly UI for task manager
const HomePage = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/logout`,
        {
          withCredentials: true,
        }
      );
      setUser(null);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full p-4">
      <div className="">
        <PrimaryButton onClick={logOut}>Logout</PrimaryButton>
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
          View your tasks below (if any)
        </h2>
        <Suspense
          fallback={
            <p className="text-center text-black mt-6 font-bold">
              Loading task List...
            </p>
          }
        >
          <TaskList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
