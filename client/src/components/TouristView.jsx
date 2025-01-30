import { useState } from "react"
// import IncidentList from "./IncidentList"
import IncidentListPage from "./IncidentListPage"
import IncidentReportForm from "./IncidentReportButton"

export default function TouristView({ user, communities, incidents, onJoinCommunity, onReportIncident }) {
  const [activeView, setActiveView] = useState("communities")

  const userCommunity = communities.find((c) => c.members.includes(user.username))

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
          <h2 className="text-2xl font-semibold mb-4">Communities</h2>
          {userCommunity ? (
            <div>
              <p>You are a member of: {userCommunity.name}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {communities.map((community) => (
                <div key={community.id} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {community.startDate} - {community.endDate}
                  </p>
                  <button
                    onClick={() => onJoinCommunity(community.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Join Community
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeView === "incidents" && (
        <div>
          <IncidentReportForm onReportIncident={onReportIncident} user={user} />
          <IncidentListPage incidents={incidents} userRole={user.role} />
        </div>
      )}
    </div>
  )
}

