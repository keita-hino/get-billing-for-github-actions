import {getOctokit} from '@actions/github'
import {getGithubActionsBillingUser} from './getGithubActionsBillingUser'
import {getSharedStorageBillingUser} from './getSharedStorageBillingUser'
import {GithubActionsBilling} from '../types/getGithubActionsBilling'

export const getBillingForUser = async (
  octokit: ReturnType<typeof getOctokit>,
  owner: string
): Promise<GithubActionsBilling> => {
  const {includedMinutes, totalMinutesUsed} = await getGithubActionsBillingUser(
    octokit,
    owner
  )
  const usableMinutes = includedMinutes - totalMinutesUsed

  const {daysLeftInBillingCycle} = await getSharedStorageBillingUser(
    octokit,
    owner
  )
  return {
    includedMinutes,
    totalMinutesUsed,
    usableMinutes,
    daysLeftInBillingCycle
  }
}
