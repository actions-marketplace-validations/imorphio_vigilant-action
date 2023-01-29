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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Archiver = void 0;
const fs_1 = require("fs");
const archiver_1 = __importDefault(require("archiver"));
const path_1 = require("path");
class Archiver {
    constructor(dir) {
        this.dir = dir;
        this.outputZipFile = `${path_1.resolve(process.cwd(), new Date().getTime().toString())}.zip`;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // create a file to stream archive data to.
                const output = fs_1.createWriteStream(this.outputZipFile);
                const archive = archiver_1.default("zip", {
                    zlib: { level: 9 }, // Sets the compression level.
                });
                // listen for all archive data to be written
                // 'close' event is fired only when a file descriptor is involved
                output.on("close", () => {
                    console.log(archive.pointer() + " total bytes");
                    console.log("archiver has been finalized and the output file descriptor has closed.");
                    resolve(this.outputZipFile);
                });
                // good practice to catch warnings (ie stat failures and other non-blocking errors)
                archive.on("warning", (err) => {
                    if (err.code === "ENOENT") {
                        console.log(err);
                    }
                    else {
                        // throw error
                        reject(err);
                    }
                });
                // good practice to catch this error explicitly
                archive.on("error", (err) => {
                    reject(err);
                });
                // pipe archive data to the file
                archive.pipe(output);
                // append files from a sub-directory, putting its contents at the root of archive
                archive.directory(this.dir, false);
                // finalize the archive (ie we are done appending files but streams have to finish yet)
                // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
                archive.finalize();
            });
        });
    }
}
exports.Archiver = Archiver;
