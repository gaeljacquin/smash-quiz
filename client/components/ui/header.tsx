import TextSpecial from "~/components/text-special";

export default function Header() {
  return (
    <>
      <div className="text-center mt-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
            <TextSpecial term1={'Smash'} term2={'Quiz'} />
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600">Test your Smash knowledge!</p>
          </div>
        </div>
      </div>
    </>
  )
}
