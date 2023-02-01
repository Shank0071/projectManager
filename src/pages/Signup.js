import { useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { db, auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [user, dispatch] = useContext(AuthContext);
  console.log(thumbnail);

  console.log(user);

  const handleThumbnail = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);
    if (!selected) {
      setThumbnailError("Select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const usr = userCredentials.user;
        const storageRef = ref(storage, "images/" + usr.uid + "/profile-pic");
        console.log(storageRef);
        uploadBytes(storageRef, thumbnail).then((snapshot) => {
          console.log("Uploaded a blob or file!");
          getDownloadURL(storageRef).then((url) => {
            console.log(url);
            console.log("thumbnail updated");
            updateProfile(auth.currentUser, {
              displayName: name,
              email: email,
              photoURL: url,
            }).then(() => console.log("profile updated"));
            setDoc(doc(db, "users", usr.uid), {
              online: true,
              displayName: name,
              photoURL: url
            })
            dispatch({ type: "LOGIN", payload: usr });
            console.log(usr);
            setName("");
            setEmail("");
            setPassword("");
            setThumbnail(null);
          });
        });
       
 
      }
    );
  };

  return (
    <form
      className="flex flex-col space-y-2 w-max p-4 mx-auto bg-white rounded-md mt-10 shadow-lg md:w-1/3"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-4 font-bold">Signup</h1>
      <label className="grid">
        <span className="mb-1">Name:</span>
        <input
          required
          type="text"
          className="outline-none border border-slate-300 rounded-sm"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
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
      <label className="grid">
        <span>Profile thumbnail:</span>
        <div>
          {thumbnail ? (
            <p className="text-gray-600">{thumbnail.name}</p>
          ) : (
            <p className="text-gray-600 hover:font-bold cursor-pointer">
              Upload Image
            </p>
          )}

          <input type="file" className="w-0 h-0" onChange={handleThumbnail} />
        </div>
      </label>
      <button className="border rounded-sm border-purple-400 text-purple-500 w-1/3 p-1 hover:border-purple-500 hover:font-bold">
        Signup
      </button>
    </form>
  );
}
