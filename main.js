import * as core from '@actions/core'
import * as github from '@actions/github'
import parseJson from 'parse-json';

async function run() {
  try {
    var context = github.context
    // payload-based values
    var owner = context.repo.owner ?? context.payload.repository.owner
    var repo = context.repo.repo ?? context.payload.repository.name
    var head_sha = (context.payload.pull_request && context.payload.pull_request.head.sha) ?? context.sha
    // input values
    var name = core.getInput("name")
    var status = core.getInput("status")
    var conclusion = core.getInput("conclusion")
    var outputTitle = core.getInput("output_title")
    var outputSummary = core.getInput("output_summary")
    var outputText = core.getInput("output_text")
    var outputAnnotations = core.getInput("output_annotations")
    if (outputAnnotations != "") {
      outputAnnotations = parseJson(core.getInput("output_annotations"))
    } else {
      outputAnnotations = []
    }
    var outputImages = core.getInput("output_annotations")
    if (outputImages != "") {
      outputImages = parseJson(core.getInput("output_images"))
    } else {
      outputImages = []
    }
    var res
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
          annotations: outputAnnotations,
          images: outputImages
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
          annotations: outputAnnotations,
          images: outputImages
        },
      })
    }
    core.setOutput("check_run_id", res.data.id)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
