"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const util = require("util");
function colorifyTag(tag) {
    let tt = tag.trim().toLowerCase();
    if (tt == "verbose")
        return colors.magenta(tag);
    else if (tt == "log")
        return colors.green(tag);
    else if (tt == "debug" || tt == "info")
        return colors.blue(tag);
    else if (tt == "warn")
        return colors.yellow(tag);
    else if (tt == "error")
        return colors.red(tag);
    return tag;
}
function getTimestamp() {
    let dt = new Date(), dd = dt.getDate(), mm = dt.getMonth() + 1, yyyy = dt.getFullYear(), h = dt.getHours(), m = dt.getMinutes(), s = dt.getSeconds();
    let f = (a) => (a < 10 ? "0" + a : a);
    return `${yyyy}-${f(mm)}-${f(dd)} ${f(h)}:${f(m)}:${f(s)}`;
}
class Logger {
    static setLevel(level) {
        if (typeof level == "number")
            this.level = level;
    }
    static console(tag, data) {
        console.log((this.timestamp ? colors.gray(getTimestamp()) : "") +
            colors.gray(" | ") +
            colorifyTag(tag /* .padEnd(8) */.toUpperCase()) +
            colors.gray(" | ") +
            util.format(...data));
    }
    static push(tag, data) {
        if (this.print)
            this.console(tag, data);
        this.write(tag, data);
    }
    static write(tag, data) { }
    static verbose(...data) {
        if (this.level <= 0)
            this.push("verbose", data);
    }
    static log(...data) {
        if (this.level <= 1)
            this.push("log", data);
    }
    static info(...data) {
        if (this.level <= 1)
            this.push("info", data);
    }
    static warn(...data) {
        if (this.level <= 2)
            this.push("warn", data);
    }
    static error(...data) {
        if (this.level <= 3)
            this.push("error", data);
    }
    static all(...data) {
        this.verbose(...data);
        this.log(...data);
        this.info(...data);
        this.warn(...data);
        this.error(...data);
    }
}
Logger.timestamp = true;
Logger.level = 0;
Logger.print = true;
exports.default = Logger;
