import * as core from "@actions/core";
import * as github from "@actions/github";

const main = async () => {
    try {
        const repo = core.getInput('repo', { required: true });
        const token = core.getInput('token', { required: true });
        const owner = core.getInput('owner', { required: true });
        const issue_number = core.getInput('issue_number', { required: true });
        const labels_to_validate = core.getInput('labels_to_validate', { required: true });

        const octokit = new github.getOctokit(token);

        const issue = octokit.rest.issues.listLabelsOnIssue({
            owner,
            repo,
            issue_number
        })

        const level = 'default'

        core.info(`level: ${labels_to_validate}`)
        core.exportVariable('level', level);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main()