import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";
import Avatar from "./Avatar";
import { useEffect } from "react";

export default function OnlineUsers() {
  const [userData, setUserData] = useState([]);

  
  
    useEffect(() => {
      const getUsers = async () => {
      const results = []
      const snapshot = await getDocs(collection(db, "users"));
      await snapshot.forEach((doc) => {
        let newObj = { ...doc.data(), id: doc.id};
      //   setUserData([...newObj, newObj]);
          results.push(newObj)
        // return newObj
      });
      setUserData(results)
    }
    getUsers()
    }, [])



  return (
    <div className="h-full w-1/5 fixed right-0 top-20 bg-white shadow-md rounded-md p-6 flex flex-col space-y-3">
        <h3 className="font-bold text-center text-xl mb-4">Users</h3>
      {userData &&
        userData.map((u) => {
          return (
            <div key={u.id} className="flex items-center justify-start space-x-4 font-bold">
              <Avatar src={u.photoURL} name={u.displayName} />
              <span>{u.displayName}</span>
              {u.online ? (<p className="h-3 w-3 bg-green-500 rounded-full"></p>) : (<p></p>)}
            </div>
          );
        })}
    </div>
  );
}
