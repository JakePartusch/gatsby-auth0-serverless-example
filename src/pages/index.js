import React from "react"
import Navbar from "../components/Navbar"
import { login, isAuthenticated, getProfile } from "../utils/auth"

const Index = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  console.log(user)

  return <Navbar user={user.name} />
}

export default Index
