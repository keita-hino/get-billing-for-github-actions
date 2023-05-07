import {getOctokit} from '@actions/github'
import {GetGithubActionsBilling} from '../types/getGithubActionsBilling'

export const getGithubActionsBillingUser = async (
  octokit: ReturnType<typeof getOctokit>,
  owner: string
): Promise<GetGithubActionsBilling> => {
  const {data} = await octokit.rest.billing.getGithubActionsBillingUser({
    username: owner
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
