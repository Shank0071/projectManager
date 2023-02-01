import Avatar from "./Avatar"
import { Link } from "react-router-dom"

export default function ProjectList({ documents }) {
  return (
    <div className="grid grid-cols-2 gap-2 items-center p-2 max-w-sm ml-4 md:max-w-xl md:grid md:grid-cols-3 lg:max-w-3xl">
      {documents && documents.map(d => (
        <Link to={`/projects/${d.id}`} key={d.id} className="bg-white p-4 w-full h-full rounded-md shadow-lg">
          <h3 className="font-bold">{d.name}</h3>
          <p className="text-gray-500">due date on {d.dueDate.toDate().toLocaleDateString()}</p>
          <div className="flex gap-2">
              {d.assignedUserList.map(u => (
                <div key={u.id} className="mt-4">
                    <Avatar src={u.photoURL}/>
                </div>
              ))}
          </div>
        </Link>
      ))}
    </div>
  )
}
