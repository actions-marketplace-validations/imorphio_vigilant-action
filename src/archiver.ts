import { createWriteStream } from "fs";
import archiver from "archiver";
import { resolve } from "path";

export class Archiver {
  private dir: string;
  private outputZipFile: string;
  constructor(dir: string) {
    this.dir = dir;
    this.outputZipFile = `${resolve(
      process.cwd(),
      new Date().getTime().toString()
    )}.zip`;
  }

  async start(): Promise<string> {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      const output = createWriteStream(this.outputZipFile);
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on("close", () => {
        console.log(archive.pointer() + " total bytes");
        console.log(
          "archiver has been finalized and the output file descriptor has closed."
        );
        resolve(this.outputZipFile);
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on("warning", (err) => {
        if (err.code === "ENOENT") {
          console.log(err);
        } else {
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
  }
}
