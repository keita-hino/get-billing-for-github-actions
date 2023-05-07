export type GithubActionsBilling = GetGithubActionsBilling &
  GetSharedStorageBilling & {
    usableMinutes: number
  }

export type GetGithubActionsBilling = {
  includedMinutes: number
  totalMinutesUsed: number
}

export type GetSharedStorageBilling = {
  daysLeftInBillingCycle: number
}
