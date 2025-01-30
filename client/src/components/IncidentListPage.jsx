import { useState } from "react"

export default function IncidentListPage({ incidents, userRole, onUpdateStatus }) {
  const [filter, setFilter] = useState("all")

  const filteredIncidents = incidents.filter((incident) => {
    if (filter === "all") return true
    return incident.status === filter
  })

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Incidents</h2>
      <div className="mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`mr-2 px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`mr-2 px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("in progress")}
          className={`mr-2 px-3 py-1 rounded ${filter === "in progress" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter("resolved")}
          className={`px-3 py-1 rounded ${filter === "resolved" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Resolved
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Incident
            </h3>
            <p className="text-gray-600 mb-2">Reporter: {incident.reporterEmail}</p>
            <p className="text-gray-600 mb-2">
              Status: {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
            </p>
            {userRole === "admin" && (
              <div className="mt-4">
                <select
                  value={incident.status}
                  onChange={(e) => onUpdateStatus(incident.id, e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

