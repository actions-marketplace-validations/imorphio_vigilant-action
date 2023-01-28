import * as core from "@actions/core";
import * as process from "process";

export interface Options {
  buildDir: string;
  imorphSecret?: string;
}

export class GitHubOptions implements Options {
  get buildDir(): string {
    return core.getInput("buildDir");
  }
}

export class EnvOptions implements Options {
  get imorphSecret(): string {
    return process.env.IMORPH_SECRET || "";
  }

  get buildDir(): string {
    return process.env.IMORPH_BUILD_DIR || "";
  }
}
