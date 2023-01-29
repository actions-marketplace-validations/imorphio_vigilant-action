import * as core from "@actions/core";
import FormData from "form-data";
import { existsSync, statSync, createReadStream } from "fs";
import { GitHubOptions } from "./options";
import { Archiver } from "./archiver";
import { ImorphClient } from "./axios";

export async function pre(options: GitHubOptions): Promise<void> {
  try {
    core.info("Imorph pre build setup...");
    const imorphClient = new ImorphClient(options);
    const data = await imorphClient.create();
    core.saveState("APP_BUILD_ID", data.id);
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err);
    } else {
      core.setFailed("Something went wrong");
    }
  }
}

export async function main(options: GitHubOptions): Promise<void> {
  try {
    core.info("Imorph main build setup...");
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err);
    } else {
      core.setFailed("Something went wrong");
    }
  }
}

export async function post(options: GitHubOptions): Promise<void> {
  try {
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
    const imorphClient = new ImorphClient(options);
    const id = core.getState("APP_BUILD_ID");
    const data = await imorphClient.status(id);
    if (data === "TRUE") {
      const { size } = statSync(output);
      const signed = await imorphClient.uploadSigned(id, size);
      const formData = new FormData();
      formData.append("Content-Type", "application/zip");
      Object.entries(signed.fields).forEach(([k, v]) => {
        formData.append(k, v);
      });
      formData.append("file", createReadStream(output));
      await imorphClient.uploadBuild(signed.url, formData);
    }
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err);
    } else {
      core.setFailed("Something went wrong");
    }
  }
}
