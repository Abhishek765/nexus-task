import { useUserContext } from "../context/User";

// TODO: home page complete -> mainly UI for task manager
const HomePage = () => {
  const { user } = useUserContext();

  return (
    <div className="text-black">
      {user?.email} {user?.name}
    </div>
  );
};

export default HomePage;
