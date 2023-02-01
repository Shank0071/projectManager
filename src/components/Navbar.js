import { Link } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";

export default function Navbar() {
  const [user, dispatch] = useContext(AuthContext);
  const logout = () => {
    signOut(auth)
      .then(() => {
        if (user) {
          updateDoc(doc(db, "users", user.user.uid), {
            online: false,
          });
          dispatch({ type: "LOGOUT" });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="flex items-center px-10 py-5 justify-between bg-slate-100">
      <div>
        <h1 className="font-bold text-3xl">The Dojo</h1>
      </div>
      <div className="flex items-center space-x-4">
        {!user.user ? (
          <>
            <Link className="hover:font-bold" to="/login">
              Login
            </Link>
            <Link className="hover:font-bold" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <Link
            className="border p-2 border-slate-600 bg-white rounded-md hover:font-bold text-slate-600"
            onClick={logout}
            to="/#"
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
