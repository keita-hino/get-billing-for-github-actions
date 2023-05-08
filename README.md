# Get Billing for GitHub Actions

This [JavaScript GitHub Action](https://docs.github.com/en/actions/creating-actions/about-custom-actions#javascript-actions) gets the billing for the current month's GitHub Actions.

<img width="669" alt="image" src="https://user-images.githubusercontent.com/15973671/236662336-f1d2b2a2-7188-4c9d-987c-72ee062f67c1.png">

In this example, the Slack notification section is implemented using the [Slack Notify - GitHub Action](https://github.com/rtCamp/action-slack-notify).

## Usage
1. Create a workflow file  
Please add to an existing workflow file with reference to the following.  

    ```yml
    name: Notify the billing of GitHub Actions for the current month to Slack
    on:
      schedule:
        # ref: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule
        - cron: '0 9 * * 1'

    jobs:
      check-github-actions-usage:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v3
          - uses: actions/setup-node@v3
            with:
              node-version: 18
          - name: Get billing for GitHub Actions
            id: get-billing-for-github-actions
            uses: keita-hino/get-billing-for-github-actions@v0.1.1
            with:
              # For organization accounts, set the `org` parameter.
              account-type: user
              github-token: ${{ secrets.PAT_ACCESS_TOKEN }}
          - name: Slack Notification
            uses: rtCamp/action-slack-notify@v2
            env:
              SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
              SLACK_TITLE: Usage of GitHub Actions for the current month
              MSG_MINIMAL: true
              SLACK_MESSAGE: > 
                The usage limit of GitHub Actions for the current plan is *${{steps.get-billing-for-github-actions.outputs.included-minutes}}* minutes.
                The usage for this month is *${{steps.get-billing-for-github-actions.outputs.total-minutes-used}}* minutes, and there are *${{steps.get-billing-for-github-actions.outputs.usable-minutes}}* minutes remaining.
                The next reset day is in *${{steps.get-billing-for-github-actions.outputs.days-left-in-billing-cycle}}* days.
    ```

2. Create a PAT  
  To use this workflow, you will need to create a [Personal Access Token (PAT)](https://github.com/settings/tokens?type=beta) with the necessary permissions.  
    - For **User accounts**, grant the `plan` permissions to your PAT.  
      <img width="814" alt="スクリーンショット 2023-05-07 14 52 36" src="https://user-images.githubusercontent.com/15973671/236660293-6cdd275e-c0ec-455b-aac9-76554b36829b.png">
    - For **Organization accounts**, grant the `Organization administration` permissions to your PAT.    
      <img width="797" alt="スクリーンショット 2023-05-07 14 52 47" src="https://user-images.githubusercontent.com/15973671/236660298-9882b616-5094-4ead-899f-d967ea8fe3e2.png">
3. Set the created PAT as a secret  
Please set the created PAT as a secret named `ACCESS_TOKEN`.  
https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository

4. Set the created SLACK_WEBHOOK as a secret 
Please refer to the following instructions to set up SLACK_WEBHOOK as a secret.  
https://github.com/rtCamp/action-slack-notify#usage

## Inputs
| Name | Description |
|------|-------------|
| account-type | `user` or `org`. The default is `user`. |
| github-token | Personal Access Token (PAT) |

## Outputs
| Name | Description |
|------|-------------|
| included-minutes | The amount of free GitHub Actions minutes available |
| total-minutes-used | The sum of the free and paid GitHub Actions minutes used |
| usable-minutes | The value obtained by subtracting total-minutes-used from included-minutes |
| days-left-in-billing-cycle | Numbers of days left in billing cycle |

## License
All scripts in this project are released under the MIT License.
