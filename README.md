# Issue Label to semver Level

A Github action to determine level of release according to labels in an issue

This action was created to help facilitate a GitHub Action "ChatOps" solution.

## Usage

---

```yaml
    - name: Level lelease
        uses: nestordgs-tw/issue-labels-to-level-release@main
        with:
          owner: ${{ github.repository_owner }}
          repo: ${{ github.event.repository.name }}
          issue_number: ${{ github.event.issue.number }}
          labels_to_validate: '[{ "value": "patch", "label": "label1" },{ "value": "minor", "label": "label2" },{ "value": "major", "label": "label3" }]'
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Outputs

The level releated according to the labels. Note that in order to read the step output the action step must have an id.

```yaml
    - name: Level lelease
        id: level_release
        uses: nestordgs-tw/issue-labels-to-level-release@main
        with:
          owner: ${{ github.repository_owner }}
          repo: ${{ github.event.repository.name }}
          issue_number: ${{ github.event.issue.number }}
          labels_to_validate: '[{ "value": "patch", "label": "label1" },{ "value": "minor", "label": "label2" },{ "value": "major", "label": "label3" }]'
          token: ${{ secrets.GITHUB_TOKEN }}
    - name: Check outputs
        run: |
            echo "Level: ${{ steps.level_release.outputs.level }}"
```
