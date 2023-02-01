import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db, auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, dispatch] = useContext(AuthContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const usr = userCredentials.user;
        dispatch({ type: "LOGIN", payload: usr });
        setEmail("")
        setPassword("")
        updateDoc(doc(db, "users", usr.uid), {
          online: true
        })
      }
    );
  };

  return (
    <form
      className="flex flex-col space-y-8 w-max p-4 mx-auto bg-white rounded-md mt-10 shadow-lg md:w-1/3"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold">Login</h1>
      <label className="grid">
        <span>Email:</span>
        <input
          required
          type="email"
          className="outline-none border border-slate-300 rounded-sm"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label className="grid">
        <span>Password:</span>
        <input
          required
          type="password"
          className="outline-none border border-slate-300 rounded-sm"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="border rounded-sm border-purple-400 text-purple-500 w-1/3 p-1 hover:border-purple-500 hover:font-bold">
        Login
      </button>
    </form>
  )
}
