import { useState } from "react"

export default function IncidentReportForm({ onReportIncident, user }) {
  const [incidentData, setIncidentData] = useState({
    type: "",
    image: "",
    reporterEmail: user.email,
    reporterUsername: user.username,
    reporterPhoneNumber: user.phoneNumber,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onReportIncident(incidentData)
    setIncidentData({ ...incidentData, type: "", image: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-sm mb-8">
      <h3 className="text-xl font-semibold mb-4">Report Incident</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={incidentData.type}
          onChange={(e) => setIncidentData({ ...incidentData, type: e.target.value })}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">Select Incident Type</option>
          <option value="animal">Animal</option>
          <option value="poaching">Poaching</option>
          <option value="fire">Fire</option>
          <option value="smoke">Smoke</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setIncidentData({ ...incidentData, image: e.target.files?.[0]?.name || "" })}
          className="border rounded px-3 py-2"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
        Submit Report
      </button>
    </form>
  )
}

