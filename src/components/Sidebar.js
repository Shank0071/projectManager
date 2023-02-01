import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";

export default function Sidebar() {
  const [{user}] = useContext(AuthContext);
  return (
    <div className="bg-violet-500 text-white w-1/6 flex-col p-4 space-y-5">
      <h1 className="border-b border-slate-300 font-bold text-center pb-5 pt-2">
        {user && <Avatar src={user.photoURL} />}
        {user && <p>{user.displayName}</p>}
      </h1>
      <ul className="p-5 font-semibold">
        <li className="mb-5 active:bg-slate-300 hover:text-black hover:bg-slate-200 cursor-pointer rounded-full px-1">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="active:bg-slate-300 hover:text-black hover:bg-slate-200 cursor-pointer rounded-full px-1">
          <Link to="/create">New Project</Link>
        </li>
      </ul>
    </div>
  );
}
