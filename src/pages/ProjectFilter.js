

const filterList = [
  "all",
  "mine",
  "development",
  "marketing",
  "sales",
  "design",
];

export default function ProjectFilter({currentFilter, changeFilter}) {
 

  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  };
  


  return (
    <div>
      <nav className="bg-white max-w-md ml-6 p-2 rounded-md flex justify-between">
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => {
              handleClick(f);
            }}
            className={`${currentFilter === f ? "text-purple-500 font-bold" : "text-gray-500 font-bold"}`}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
