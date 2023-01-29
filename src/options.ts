import * as core from "@actions/core";
import * as process from "process";
import { resolve } from "path";

export class GitHubOptions {
  get buildDir(): string {
    return process.cwd() + (core.getInput("buildDir") || "/dist");
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
