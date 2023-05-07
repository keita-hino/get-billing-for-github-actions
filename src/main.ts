import {getOctokit, context} from '@actions/github'
import * as core from '@actions/core'
import {getBillingForUser} from './user/getBillingForUser'
import {getBillingForOrg} from './org/getBillingForOrg'

async function run(): Promise<void> {
  try {
    const accountType = core.getInput('account-type')
    const token = core.getInput('github-token')
    const owner = context.repo.owner
    const octokit = token && getOctokit(token)

    if (!token) {
      core.setFailed('Missing github token')
      return
    }

    if (!octokit) {
      core.setFailed('No octokit client')
      return
    }

    const {
      includedMinutes,
      totalMinutesUsed,
      usableMinutes,
      daysLeftInBillingCycle
    } =
      accountType === 'user'
        ? await getBillingForUser(octokit, owner)
        : await getBillingForOrg(octokit, owner)

    core.setOutput('included-minutes', includedMinutes)
    core.setOutput('total-minutes-used', totalMinutesUsed)
    core.setOutput('usable-minutes', usableMinutes)
    core.setOutput('days-left-in-billing-cycle', daysLeftInBillingCycle)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
