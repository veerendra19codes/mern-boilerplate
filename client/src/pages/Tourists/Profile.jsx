"use client"

import { useState, useEffect } from "react"
import ProfileInfo from "../../components/ProfileInfo"
import BlogList from "../../components/BlogList"

export default function TouristProfile() {
  const [profile, setProfile] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("usertoken");
        console.log("usertoken: ", token);
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
        const getprofiletouristurl = `${import.meta.env.VITE_BACKEND_URL}/api/getprofile/tourist`;
        const getblogtouristurl = `${import.meta.env.VITE_BACKEND_URL}/api/getblog/tourist`;

        const [profileResponse, blogsResponse] = await Promise.all([
          fetch(getprofiletouristurl, { headers }),
          fetch(getblogtouristurl, { headers }),
        ])

        if (!profileResponse.ok || !blogsResponse.ok) {
          throw new Error("Failed to fetch data")
        }

        const profileData = await profileResponse.json()
        const blogsData = await blogsResponse.json()
        console.log("profileData, blogsData: ", profileData, blogsData);

        setProfile(profileData)
        setBlogs(blogsData)
        setLoading(false)
      } catch (err) {
        setError("Error fetching data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileInfo profile={profile} />
      <BlogList blogs={blogs} />
    </div>
  )
}

