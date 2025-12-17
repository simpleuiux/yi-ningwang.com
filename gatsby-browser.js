// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "typeface-nunito"
import "typeface-alegreya"

// Tailwind CSS
import "./src/utils/css/tailwind.css"

import React from "react"
import { AuthProvider } from "./src/contexts/AuthContext"

export const wrapRootElement = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}
