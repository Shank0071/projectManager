export default function Avatar({ src }) {
  return (
    <div className="flex items-center space-x-2 justify-center">
      <div className="bg-gray-300 border border-black border-4 rounded-full h-16 w-16 flex items-center justify-center">
        <img
          src={src}
          height="50"
          width="50"
          alt="user avatar"
          className="object-cover rounded-3xl h-full"
        />
      </div>
    </div>
  );
}
