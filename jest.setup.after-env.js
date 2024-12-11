import "@testing-library/jest-dom"
import * as React from "react"

global.React = React

process.env.FORWARDER_API_KEY = "test-forwarder-api-key"
process.env.NEXT_PUBLIC_MUNZEN_API_KEY = "test-munzen-api-key"
process.env.MUNZEN_API_SECRET = "test-munzen-api-secret"
