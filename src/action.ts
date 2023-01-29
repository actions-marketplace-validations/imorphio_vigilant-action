import { GitHubOptions } from "./options";
import { Actions } from "./github-actions";
import { existsSync, statSync } from "fs";
import { Archiver } from "./archiver";

export async function run(
  options: GitHubOptions,
  actions: Actions
): Promise<void> {
  const buildDir = options.buildDir;

  console.log(process.env);

  if (!existsSync(buildDir)) {
    actions.setFailed(`${buildDir} not found`);
    return;
  }

  if (!existsSync(`${buildDir}/index.html`)) {
    actions.setFailed(
      `${buildDir} your build directory should contain index.html in root`
    );
    return;
  }

  const archiver = new Archiver(buildDir);
  const output = await archiver.start();
  console.log(statSync(output));
}
