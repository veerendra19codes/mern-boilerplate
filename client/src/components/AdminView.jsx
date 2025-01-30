import { useState } from "react"
import IncidentListPage from "../components/IncidentListPage"

export default function AdminView({
  communities,
  incidents,
  onCreateCommunity,
  onVerifyTourist,
  onUpdateIncidentStatus,
}) {
  const [newCommunity, setNewCommunity] = useState({ name: "", startDate: "", endDate: "" })
  const [activeView, setActiveView] = useState("communities")

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateCommunity(newCommunity)
    setNewCommunity({ name: "", startDate: "", endDate: "" })
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setActiveView("communities")}
          className={`mr-2 px-3 py-1 rounded ${
            activeView === "communities" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Communities
        </button>
        <button
          onClick={() => setActiveView("incidents")}
          className={`mr-2 px-3 py-1 rounded ${activeView === "incidents" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Incidents
        </button>
      </div>

      {activeView === "communities" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Community</h2>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Community Name"
                value={newCommunity.name}
                onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="date"
                placeholder="Start Date"
                value={newCommunity.startDate}
                onChange={(e) => setNewCommunity({ ...newCommunity, startDate: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="date"
                placeholder="End Date"
                value={newCommunity.endDate}
                onChange={(e) => setNewCommunity({ ...newCommunity, endDate: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Create Community
            </button>
          </form>

          <h2 className="text-2xl font-semibold mb-4">Existing Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities.map((community) => (
              <div key={community.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                <p className="text-gray-600 mb-2">
                  {community.startDate} - {community.endDate}
                </p>
                <p className="text-sm text-gray-500">Join Link: {community.joinLink}</p>
                <h4 className="font-semibold mt-4 mb-2">Members:</h4>
                <ul>
                  {community.members.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === "incidents" && (
        <IncidentListPage incidents={incidents} userRole="admin" onUpdateStatus={onUpdateIncidentStatus} />
      )}
    </div>
  )
}

