import { getSock } from "../bot.js";

export async function getGroups() {
  const sock = getSock();

  const groups = await sock?.groupFetchAllParticipating();

  const groupsArray = Object.values(groups ?? {});

  return groupsArray;
}
