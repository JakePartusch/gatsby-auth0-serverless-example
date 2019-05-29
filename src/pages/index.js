import React from "react"
import Navbar from "../components/Navbar"
import { login, isAuthenticated, getProfile } from "../utils/auth"
import CheckboxList from "../components/CheckboxList"
import { Container } from "@material-ui/core"

const Index = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <Navbar user={user.name} />
      <Container>
        <CheckboxList username={user.nickname} />
      </Container>
    </>
  )
}

export default Index
