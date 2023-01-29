"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyActions = exports.LogActions = exports.GitHubActions = void 0;
/* eslint-disable no-console */
const core = __importStar(require("@actions/core"));
class GitHubActions {
    debug(message) {
        core.debug(message);
    }
    info(message) {
        core.info(message);
    }
    warning(message) {
        core.warning(message);
    }
    setOutput(name, output) {
        core.setOutput(name, output);
    }
    setFailed(message) {
        core.setFailed(message);
    }
}
exports.GitHubActions = GitHubActions;
class LogActions {
    debug(message) {
        console.info(message);
    }
    info(message) {
        console.info(message);
    }
    warning(message) {
        console.warn(message);
    }
    setOutput(name, output) {
        console.log(name, output);
    }
    setFailed(message) {
        console.error(message);
    }
}
exports.LogActions = LogActions;
/* eslint-disable @typescript-eslint/no-unused-vars */
class EmptyActions {
    debug(message) { }
    info(message) { }
    warning(message) { }
    setOutput(name, output) { }
    setFailed(message) { }
}
exports.EmptyActions = EmptyActions;
/* eslint-enable @typescript-eslint/no-unused-vars */
