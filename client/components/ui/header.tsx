export default function Header() {
  return (
    <>
      <div className="text-center mt-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Smash</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gael-purple to-red-500">
              {" "}
              Quiz
            </span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600">Test your Smash knowledge!</p>
          </div>
        </div>
      </div>
    </>
  )
}
