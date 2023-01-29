import axios, { AxiosInstance } from "axios";
import FormData from "form-data";
import { GitHubOptions } from "./options";

export class ImorphClient {
  private axios: AxiosInstance;
  private options: GitHubOptions;

  constructor(options: GitHubOptions) {
    const { imorphDomain, imorphSecret } = options;
    const baseURL = `https://${imorphDomain}/api/vigilantaction/${imorphSecret}/${imorphDomain}`;
    this.axios = axios.create({
      baseURL,
      headers: { "im-vigilant-action": true },
    });
    this.options = options;
  }

  async create() {
    const { githubRepo, githubRunId, githubRef, githubEvent } = this.options;
    const url = `/create`;
    const title = `${githubRepo} : ${githubRef} : ${githubEvent}`;
    const jobHostname = githubRepo;
    const jobId = githubRunId;
    const { data } = await this.axios.post(url, { title, jobHostname, jobId });
    return data;
  }

  async status(id: string) {
    const { imorphDomain } = this.options;
    const url = `/status`;
    const buildId = `${imorphDomain}/${id}`;
    const action = "AUTO_PUBLISH";
    const status = "SUCCESS";
    const { data } = await this.axios.post(url, { buildId, action, status });
    return data;
  }

  async uploadSigned(id: string, size: number) {
    const url = `/upload`;
    const { data } = await this.axios.post(url, { id, size });
    return data;
  }

  async uploadBuild(url: string, formData: FormData) {
    return new Promise((resolve, reject) => {
      formData.submit(url, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
