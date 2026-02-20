
import pc from 'picocolors';

export interface LoggerOptions {
  level?: number;
  tags?: string[];
}

export const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;

export type LogLevel = keyof typeof LOG_LEVELS;

let defaultLevel: number = LOG_LEVELS.info;
if (typeof process !== 'undefined') {
  const { env } = await import('@pasta/env');
  defaultLevel = env.LOG_LEVEL
    ?? env.NODE_ENV === 'production' ? LOG_LEVELS.info : LOG_LEVELS.debug;
}

export class Logger {
  private level: number;
  private tags: string[];

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? defaultLevel;
    this.tags = options.tags ?? [];
  }

  private shouldLog(level: number): boolean {
    return level <= this.level;
  }

  private formatMessage(level: LogLevel, msg: string): string {
    const timestamp = pc.gray(new Date().toISOString());
    const levelStr = this.colorizeLevel(level);
    const tagsStr = this.tags.length > 0 ? pc.gray(` [${this.tags.join(', ')}]`) : '';
    const message = level === 'debug' ? pc.gray(msg) : msg;

    return `${timestamp}${tagsStr} ${levelStr} ${message}`;
  }

  private colorizeLevel(level: LogLevel): string {
    switch (level) {
      case 'error':
        return pc.red(level);
      case 'warn':
        return pc.yellow(level);
      case 'info':
        return pc.blue(level);
      case 'debug':
        return pc.gray(level);
    }
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    if (!this.shouldLog(LOG_LEVELS[level])) return;
    const formatted = this.formatMessage(level, message);
    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    console[consoleMethod](formatted, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args);
  }

  child(options: LoggerOptions): Logger {
    return new Logger({
      level: options.level ?? this.level,
      tags: [...this.tags, ...(options.tags ?? [])],
    });
  }

  setLevel(level: number) {
    this.level = level;
  }
}

export const logger = new Logger();
