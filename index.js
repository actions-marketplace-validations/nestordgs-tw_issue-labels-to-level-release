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
        
        const labelsToValidate = JSON.parse(labels_to_validate);

        const { data } = await octokit.rest.issues.listLabelsOnIssue({
            owner,
            repo,
            issue_number
        });
        
        if (!data.length) {
            core.setFailed('Issue without labels');
        }
        
        if (!labelsToValidate.length) {
            core.setFailed('No labels to validate');
        }

        let level = 'default'

        data.forEach((issueLabel, index) => {
            const levelRelease = labelsToValidate.filter(item => item.label == issueLabel.name);
            core.info(`levelRelease: `);
            core.info(levelRelease.length);
            if (levelRelease.length) {
                level = levelRelease[0].value
            }
        });

        core.exportVariable('level', level);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main()