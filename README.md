# check-run-action

![Maintained](https://badgen.net/badge/Maintained/yes/green)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)

Action to [add check runs](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28#create-a-check-run) to gitHub workflows.

## 🚀 Getting started

Here is a simple example of how to use this action in a job:

```yaml
jobs:
  minimalist:
    name: Minimalist Example
    runs-on: ubuntu-latest

    permissions:
      contents: read
      checks: write

    steps:
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
```

In addition to the basic usage above, you can also make use of more advanced outputs, such as `annotations` and `images`. To use those, you need to pass a list in JSON format ([see format specification here](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28#create-a-check-run)). Here is an example:

```yaml
      - name: Add check run with annotations
        uses: marcelocarlos/check-run-action@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          name: My Check Results with annotations
          conclusion: success
          status: completed
          output_title: My Check Results with annotations
          output_summary: Summary of my **check results** (*Markdown supported*)
          output_text: Details of my **check results** (*Markdown supported*)
          output_annotations: |
            [
              { "path":"README.md", "annotation_level":"warning", "title":"Title of my warning check", "message":"Message abc.", "start_line":1,"end_line":2 },
              { "path":"README.md", "annotation_level":"failure", "title":"Title of failure check", "message":"Message xyz.", "start_line":3,"end_line":5 },
              { "path":"README.md", "annotation_level":"notice", "title":"Title of notice check", "message":"Message notice test.", "start_line":16,"end_line":18, "raw_details":"Raw notice details here" }
            ]
          output_images: |
            [
              { "alt":"My image", "caption":"Image description", "image_url": "https://fastly.picsum.photos/id/43/200/200.jpg?hmac=gMoEYpdjrHoRnKoyIdtTknuqyCQDTC8exwLaKHpMv6E" }
            ]
```

For more advanced examples, check the [demo.yaml](./.github/workflows/demo.yaml) workflow.

## 🧑‍💻 Making changes to this action

When making changes to this action, run `npm install` followed by `npm run build` to recompile the distribution files before pushing the changes.
