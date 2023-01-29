import * as core from "@actions/core";
import { existsSync, statSync } from "fs";
import { GitHubOptions } from "./options";
import { Archiver } from "./archiver";
import { ImorphClient } from "./axios";

export async function pre(options: GitHubOptions): Promise<void> {
  core.info("Imorph pre build setup...");
  const imorphClient = new ImorphClient(options);
  await imorphClient.create();
}

export async function main(options: GitHubOptions): Promise<void> {
  core.info("Imorph main build setup...");
}

export async function post(options: GitHubOptions): Promise<void> {
  core.info("Imorph post build setup...");
  const buildDir = options.buildDir;

  if (!existsSync(buildDir)) {
    core.setFailed(`${buildDir} not found`);
    return;
  }

  if (!existsSync(`${buildDir}/index.html`)) {
    core.setFailed(
      `${buildDir} your build directory should contain index.html in root`
    );
    return;
  }

  const archiver = new Archiver(buildDir);
  const output = await archiver.start();
  console.log(statSync(output));
}
