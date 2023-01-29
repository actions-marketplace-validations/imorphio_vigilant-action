"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const options_1 = require("./options");
const github_actions_1 = require("./github-actions");
action_1.run(new options_1.GitHubOptions(), new github_actions_1.GitHubActions());
