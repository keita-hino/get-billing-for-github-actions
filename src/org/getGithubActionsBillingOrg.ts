import {getOctokit} from '@actions/github'
import {GetGithubActionsBilling} from '../types/getGithubActionsBilling'

export const getGithubActionsBillingOrg = async (
  octokit: ReturnType<typeof getOctokit>,
  owner: string
): Promise<GetGithubActionsBilling> => {
  const {data} = await octokit.rest.billing.getGithubActionsBillingOrg({
    org: owner
  })

  const {
    included_minutes: includedMinutes,
    total_minutes_used: totalMinutesUsed
  } = data

  return {
    includedMinutes,
    totalMinutesUsed
  }
}
