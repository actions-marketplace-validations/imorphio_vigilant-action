"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs_1 = require("fs");
const archiver_1 = require("./archiver");
function run(options, actions) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildDir = options.buildDir;
        console.log(process.env);
        console.log(options.buildDir, options.imorphDomain, options.imorphSecret);
        if (!fs_1.existsSync(buildDir)) {
            actions.setFailed(`${buildDir} not found`);
            return;
        }
        if (!fs_1.existsSync(`${buildDir}/index.html`)) {
            actions.setFailed(`${buildDir} your build directory should contain index.html in root`);
            return;
        }
        const archiver = new archiver_1.Archiver(buildDir);
        const output = yield archiver.start();
        console.log(fs_1.statSync(output));
    });
}
exports.run = run;
