
export default function ProfileInfo({ profile }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            src={profile.image || "/placeholder.svg"}
            alt={profile.name}
            
            className="h-48 w-full object-cover md:w-48"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Wildlife Tourist</div>
          <h2 className="mt-2 text-2xl leading-8 font-semibold text-gray-900">{profile.name}</h2>
          <p className="mt-2 text-gray-600">{profile.bio}</p>
        </div>
      </div>
    </div>
  )
}

