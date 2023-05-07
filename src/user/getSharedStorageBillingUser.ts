import {getOctokit} from '@actions/github'
import {GetSharedStorageBilling} from '../types/getGithubActionsBilling'

export const getSharedStorageBillingUser = async (
  octokit: ReturnType<typeof getOctokit>,
  owner: string
): Promise<GetSharedStorageBilling> => {
  const {data} = await octokit.rest.billing.getSharedStorageBillingUser({
    username: owner
  })

  const {days_left_in_billing_cycle: daysLeftInBillingCycle} = data

  return {
    daysLeftInBillingCycle
  }
}
