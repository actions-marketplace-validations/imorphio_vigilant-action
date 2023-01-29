import axios, { AxiosInstance } from "axios";
import { GitHubOptions } from "./options";

export class ImorphClient {
  private axios: AxiosInstance;
  private options: GitHubOptions;
  constructor(options: GitHubOptions) {
    this.axios = axios.create({ headers: { "im-vigilant-action": true } });
    this.options = options;
  }

  async create() {
    const {
      imorphDomain,
      imorphSecret,
      githubRepo,
      githubRunId,
      githubRef,
      githubEvent,
    } = this.options;

    const url = `https://${imorphDomain}/api/vigilantaction/${imorphSecret}/${imorphDomain}/create`;
    const title = `${githubRepo} : ${githubRef} : ${githubEvent}`;
    const jobHostname = githubRepo;
    const jobId = githubRunId;
    const { data } = await this.axios.post(url, { title, jobHostname, jobId });
    return data;
  }
}
