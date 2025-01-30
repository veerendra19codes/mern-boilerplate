import { useState } from "react"

export default function IncidentReportButton({ onReport, user }) {
  const [isReporting, setIsReporting] = useState(false)
  const [incidentData, setIncidentData] = useState({
    type: "",
    image: "",
    reporterEmail: user.email,
    reporterUsername: user.username,
    reporterPhoneNumber: user.phoneNumber,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onReport(incidentData)
    setIsReporting(false)
    setIncidentData({ ...incidentData, type: "", image: "" })
  }

  return (
    <div className="mb-8">
      {!isReporting ? (
        <button
          onClick={() => setIsReporting(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Report Incident
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-sm">
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
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setIsReporting(false)}
              className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Submit Report
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

