import { Options } from "./options";
import { Actions } from "./github-actions";

export async function run(options: Options, actions: Actions): Promise<void> {
  actions.info("Yes its working");
}
