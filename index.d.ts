declare class Logger {
    static timestamp: boolean;
    static level: number;
    static print: boolean;
    static setLevel(level: number): void;
    static console(tag: string, data: any): void;
    static push(tag: string, data: any): void;
    static write(tag: string, data: any): void;
    static verbose(...data: any[]): void;
    static log(...data: any[]): void;
    static info(...data: any[]): void;
    static warn(...data: any[]): void;
    static error(...data: any[]): void;
    static all(...data: any[]): void;
}
export default Logger;
