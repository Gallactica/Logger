import * as colors from "colors";
import * as util from "util";

function colorifyTag(tag: string): string {
  let tt = tag.trim().toLowerCase();
  if (tt == "verbose") return colors.magenta(tag);
  else if (tt == "log") return colors.green(tag);
  else if (tt == "debug" || tt == "info") return colors.blue(tag);
  else if (tt == "warn") return colors.yellow(tag);
  else if (tt == "error") return colors.red(tag);
  return tag;
}

function getTimestamp(): string {
  let dt = new Date(),
    dd = dt.getDate(),
    mm = dt.getMonth() + 1,
    yyyy = dt.getFullYear(),
    h = dt.getHours(),
    m = dt.getMinutes(),
    s = dt.getSeconds();

  let f = (a: number) => (a < 10 ? "0" + a : a);

  return `${yyyy}-${f(mm)}-${f(dd)} ${f(h)}:${f(m)}:${f(s)}`;
}

class Logger {
  static timestamp = true;
  static level = 0;
  static print = true;

  static setLevel(level: number) {
    if (typeof level == "number") this.level = level;
  }

  static console(tag: string, data: any) {
    console.log(
      (this.timestamp ? colors.gray(getTimestamp()) : "") +
        colors.gray(" | ") +
        colorifyTag(tag/* .padEnd(8) */.toUpperCase()) +
        colors.gray(" | ") +
        util.format(...data)
    );
  }

  static push(tag: string, data: any) {
    if (this.print) this.console(tag, data);
    this.write(tag, data);
  }

  static write(tag: string, data: any) {}

  static verbose(...data: any[]) {
    if (this.level <= 0) this.push("verbose", data);
  }
  static log(...data: any[]) {
    if (this.level <= 1) this.push("log", data);
  }
  static info(...data: any[]) {
    if (this.level <= 1) this.push("info", data);
  }
  static warn(...data: any[]) {
    if (this.level <= 2) this.push("warn", data);
  }
  static error(...data: any[]) {
    if (this.level <= 3) this.push("error", data);
  }

  static all(...data: any[]) {
    this.verbose(...data);
    this.log(...data);
    this.info(...data);
    this.warn(...data);
    this.error(...data);
  }
}

export default Logger;
