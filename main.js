import * as core from '@actions/core'
import * as github from '@actions/github'
import parseJson from 'parse-json';

async function run() {
  try {
    const context = github.context
    // payload-based values
    const owner = context.repo.owner ?? context.payload.repository.owner
    const repo = context.repo.repo ?? context.payload.repository.name
    const head_sha = (context.payload.pull_request && context.payload.pull_request.head.sha) ?? context.sha
    // input values
    const name = core.getInput("name")
    const status = core.getInput("status")
    const conclusion = core.getInput("conclusion")
    const outputTitle = core.getInput("output_title")
    const outputSummary = core.getInput("output_summary")
    const outputText = core.getInput("output_text")
    const outputAnnotations = core.getInput("output_annotations")
    if (outputAnnotations != "") {
      outputAnnotations = parseJson(core.getInput("output_annotations"))
    }
    const outputImages = core.getInput("output_annotations")
    if (outputImages != "") {
      outputImages = parseJson(core.getInput("output_annotations"))
    }

    // Create or update check run
    if (core.getInput("check_run_id")) {
      // update check run
      res = await github.getOctokit(core.getInput("token")).rest.checks.update({
        owner: owner,
        repo: repo,
        check_run_id: core.getInput("check_run_id"),
        name: name,
        status: status,
        conclusion: conclusion,
        output: {
          title: outputTitle,
          summary: outputSummary,
          text: outputText,
          outputAnnotations,
          outputImages
        },
      })
    } else {
      // create check run
      res = await github.getOctokit(core.getInput("token")).rest.checks.create({
        owner: owner,
        repo: repo,
        head_sha: head_sha,
        name: name,
        status: status,
        conclusion: conclusion,
        output: {
          title: outputTitle,
          summary: outputSummary,
          text: outputText,
          outputAnnotations,
          outputImages
        },
      })
    }
    core.setOutput("check_run_id", res.id)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
