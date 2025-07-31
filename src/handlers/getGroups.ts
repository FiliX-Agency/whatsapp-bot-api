import { getSock } from "../bot";

export async function getGroups() {
  const sock = getSock();

  const groups = await sock?.groupFetchAllParticipating();
  
  return groups;
}
