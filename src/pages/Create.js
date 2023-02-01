import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

// <option value="">label</option> We are just imitaing the standard select tag of html in Select

export default function Create() {
  const history = useHistory()
  const [{user}] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("")
  const [assignedUsers, setAssignedUsers] = useState([])
  const [users, setUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    async function getUsers() {
      const results = [];
      const users1 = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        let newObjt = {...doc.data(), id: doc.id}
        results.push(newObjt)
      })
      console.log(results)
      results.map((user) => {
        let newObj = {value: user, label: user.displayName};
        users1.push(newObj)
      })
      setUsers(users1)
    }
    getUsers()
  }, [])
  console.log(users)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    if (!category) {
      setFormError("Please Select a category");
      return
    }
    if (!assignedUsers) {
      setFormError("Please Select an Assignee");
      return
    }
    console.log(name, details, dueDate, category.value, assignedUsers)

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }


    const assignedUserList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name:name,
      details: details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy: createdBy,
      assignedUserList: assignedUserList
    }

    try {
      const docRef = await addDoc(collection(db, "projects"), project);
      console.log("Document written with ID: ", docRef.id);
      history.push("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log(project)
  }

  return (
    <div className="px-4 ml-6 mt-5 flex flex-col space-y-4">
      <h3 className="font-bold">Create a new project</h3>
      <form className="flex flex-col space-y-4 w-1/2" onSubmit={handleSubmit}>
        <label className="flex flex-col space-y-2">
          <span>Project name:</span>
          <input
            type="text"
            className="outline-none border border-gray-300 rounded-md p-1"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label className="flex flex-col space-y-2">
          <span>Project Details:</span>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="resize-none outline-none border border-gray-300 rounded-md p-1"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label className="flex flex-col space-y-2">
          <span>Set due date:</span>
          <input
            type="date"
            className="outline-none border border-gray-300 rounded-md p-1"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>
        <label className="flex flex-col space-y-2">
          <span>Project category:</span>
          <Select 
            onChange={(option) => setCategory(option)}
            options={categories}
            required
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select 
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="border border-violet-500 border-2 rounded-md text-violet-500 w-1/4 p-2 hover:bg-violet-500 hover:text-white">Add Project</button>
        {formError && <p className="border-2 border-red-500 rounded-md bg-red-200 p-2 max-w-sm text-red-500">{formError}</p>}
      </form>
    </div>
  );
}
