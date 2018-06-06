#!/usr/bin/env node
import moment from "moment";
import { spawn } from "child_process";

const args = [
  "stream",
  "--predicate",
  `(processImagePath contains "yourAppName") and senderImageUUID == processImageUUID`,
  "--style",
  "json"
];

const lg = spawn("log", args);

lg.stdout.on("data", data => {
  const str = data.toString();

  // Assumption: { is always at the end of a line, } at the start of line.
  const m = str.match(/\{$[\s\S]+?^\}/gm);
  if (m === null) {
    return;
  }

  const all = m.map(str => JSON.parse(str));

  all.forEach(({ timestamp, eventMessage }) => {
    const time = moment(timestamp).format("H:mm:ss");

    console.log([time, eventMessage].join(", "));
    console.log("\n");
  });
});

lg.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
});

lg.on("close", code => {
  console.log(`child process exited with code ${code}`);
});
