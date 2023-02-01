import { useHistory, useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import Avatar from "../components/Avatar";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Comments from "../components/Comments";

export default function Project() {
  const { id } = useParams();
  const history = useHistory()
  const { error, document } = useDocument("projects", id);
  const [newComment, setNewComment] = useState("");
  const [{ user }] = useContext(AuthContext);
  // console.log(document.createdBy.id);

  const handleDelete = () => {
    deleteDoc(doc(db, "projects", id))
    history.push("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let comments = document.comments;
    const commentBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      comment: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    try {
      await updateDoc(doc(db, "projects", id), {
        comments: [...comments, commentBy],
      });
      setNewComment("");
    } catch (err) {
      console.log(err.message);
    }

    console.log(commentBy);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 max-w-3xl p-4 gap-4">
      <div className="grid gap-4 bg-white p-4 rounded-md">
        <h1 className="font-bold">{document.name}</h1>
        <p className="text-gray-500">{document.details}</p>
        <p className="text-gray-500">
          due on: {document.dueDate.toDate().toLocaleDateString()}
        </p>
        <p className="">Assigned to:</p>
        <div className="flex gap-2">
          {document.assignedUserList.map((u) => (
            <div key={u.id}>
              <Avatar src={u.photoURL} />
            </div>
          ))}
        </div>
        {document && document.createdBy.id === user.uid && (
          <button
              onClick={handleDelete}
              className="border-2 border-violet-300 text-violet-500 rounded-md hover:text-white hover:bg-violet-300"
              >
              Mark as Complete
          </button>
        )}
       
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <span>Comments:</span>
          <textarea
            required
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
            className="resize-none p-2 focus:outline-none border-2 border-black rounded-md bg-transparent"
          ></textarea>
          <button className="border-2 border-violet-400 text-violet-500 rounded-md w-1/4 hover:bg-violet-400 hover:text-white mt-4">
            Submit
          </button>
        </form>
      </div>
      <Comments document={document} />
    </div>
  );
}
