import * as core from "@actions/core";
import * as process from "process";

export class GitHubOptions {
  get buildDir(): string {
    return process.cwd() + core.getInput("buildDir");
  }

  get imorphSecret(): string {
    return core.getInput("imorphSecret");
  }

  get imorphDomain(): string {
    return core.getInput("imorphDomain");
  }

  get githubRepo(): string {
    return process.env.GITHUB_REPOSITORY || "";
  }

  get githubRef(): string {
    return process.env.GITHUB_REF_NAME || "";
  }

  get githubEvent(): string {
    return process.env.GITHUB_EVENT_NAME || "";
  }

  get githubSha(): string {
    return process.env.GITHUB_SHA || "";
  }

  get githubRunId(): string {
    return process.env.GITHUB_RUN_ID || "";
  }
}
