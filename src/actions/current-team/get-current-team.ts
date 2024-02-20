"use server"

import { headers } from "next/headers"
import { getCurrentTeamFromHeaders } from "@/utils/current-team"

export const getCurrentTeam = async () => getCurrentTeamFromHeaders(headers())
