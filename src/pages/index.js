import React from "react"
import { login, isAuthenticated, getProfile } from "../utils/auth"

const Index = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  console.log(user)

  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}

export default Index
