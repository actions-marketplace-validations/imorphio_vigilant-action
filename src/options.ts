import * as core from "@actions/core";
import * as process from "process";
import { resolve } from "path";

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
}

export class EnvOptions {
  get imorphSecret(): string {
    return process.env.IMORPH_SECRET || "";
  }

  get imorphDomain(): string {
    return process.env.IMORPH_DOMAIN || "";
  }
}
