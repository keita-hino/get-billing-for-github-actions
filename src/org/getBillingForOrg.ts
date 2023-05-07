import {getOctokit} from '@actions/github'
import {getGithubActionsBillingOrg} from './getGithubActionsBillingOrg'
import {getSharedStorageBillingOrg} from './getSharedStorageBillingOrg'
import {GithubActionsBilling} from '../types/getGithubActionsBilling'

export const getBillingForOrg = async (
  octokit: ReturnType<typeof getOctokit>,
  owner: string
): Promise<GithubActionsBilling> => {
  const {includedMinutes, totalMinutesUsed} = await getGithubActionsBillingOrg(
    octokit,
    owner
  )
  const usableMinutes = includedMinutes - totalMinutesUsed

  const {daysLeftInBillingCycle} = await getSharedStorageBillingOrg(
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
