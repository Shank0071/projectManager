export default function Comments({ document }) {
  return (
    <div className="flex flex-col-reverse col-start-2 overflow-y-scroll bg-white h-80 row-start-1 p-2 rounded-md">
      {document.comments.map((c) => (
        <div id={c.id} className="border p-2">
            <div className="flex items-center gap-2">
                <img src={c.photoURL} className="bg-gray-300 border h-10 w-10 border-black rounded-full object-cover" width="50" alt="img" />
                <h3 className="font-bold">{c.displayName}</h3>
            </div>
          <p>{c.comment}</p>
        </div>
      ))}
    </div>
  );
}
