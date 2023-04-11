# check-run-action - test

Action to [add check runs](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28#create-a-check-run) to gitHub workflows. test

## Table of contents

<!-- toc -->

- [Making changes to this action](#making-changes-to-this-action)
- [Examples](#examples)
  - [Minimalist](#minimalist)
  - [Annotations and Images](#annotations-and-images)
  - [Multi-step (queued, in_progress, completed)](#multi-step-queued-in_progress-completed)

<!-- tocstop -->

## Making changes to this action

When making changes to this action, run `npm install` followed by `npm run build` to recompile the distribution files before pushing the changes.

## Examples

### Minimalist

```yaml
  - name: Add check run
    uses: marcelocarlos/check-run-action@main
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      name: My Check Results
      conclusion: success
      status: completed
      output_title: My Check Results
      output_summary: Summary of my **check results** (*Markdown supported*)
```

### Annotations and Images

```yaml
  - name: Add check run
    uses: marcelocarlos/check-run-action@main
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      name: My Check Results
      conclusion: success
      status: completed
      output_title: My Check Results
      output_summary: Summary of my **check results** (*Markdown supported*)
      output_text: Details of my **check results** (*Markdown supported*)
      output_annotations: |
        [
          { "path":"README.md", "annotation_level":"warning", "title":"Title of my warning check", "message":"Message abc.", "start_line":1,"end_line":2 },
          { "path":"README.md", "annotation_level":"failure", "title":"Title of failure check", "message":"Message xyz.", "start_line":3,"end_line":5 },
          { "path":"README.md", "annotation_level":"notice", "title":"Title of notice check", "message":"Message notice test.", "start_line":8,"end_line":9, "raw_details":"Raw notice details here" }
        ]
      output_images: |
        [
          { "alt":"My image", "caption":"Image description", "image_url":"https://fastly.picsum.photos/id/43/200/200.jpg?hmac=gMoEYpdjrHoRnKoyIdtTknuqyCQDTC8exwLaKHpMv6E"}
        ]
```

### Multi-step (queued, in_progress, completed)

```yaml
  - name: Queue check run
    id: queued
    uses: marcelocarlos/check-run-action@main
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      name: My Check Results
      conclusion: success
      status: queued
      output_title: My Check queued
      output_summary: '*queued*'

  - name: Wait for in_progress
    run: sleep 10

  - name: In progress check run
    uses: marcelocarlos/check-run-action@main
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      name: My Check Results
      check_run_id: ${{ steps.queued.outputs.check_run_id }}
      conclusion: success
      status: in_progress
      output_title: My Check in_progress
      output_summary: '*in_progress*'

  - name: Wait for completed
    run: sleep 10

  - name: In progress check run
    uses: marcelocarlos/check-run-action@main
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      name: My Check Results
      check_run_id: ${{ steps.queued.outputs.check_run_id }}
      conclusion: success
      status: completed
      output_title: My Check completed
      output_summary: '*completed*'
```
