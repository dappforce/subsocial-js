import chalk, { Chalk } from 'chalk';
import log, { LogLevel, setDefaultLevel } from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

type Levels = keyof LogLevel;

const defaultLevel: Levels = process.env.LOG_LEVEL || 'INFO' as any

setDefaultLevel(defaultLevel);

const colors: Record<Levels, Chalk> = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
  SILENT: chalk.gray
};

prefix.reg(log);
log.enableAll();

prefix.apply(log, {
  format(level, name, timestamp) {
    return `${chalk.gray(`[${timestamp.toLocaleTimeString()}]`)} ${colors[level.toUpperCase() as Levels](level.length < 5 ? level + ' ' : level)} ${chalk.green(`${name}:`)}`;
  },
});

export const newLogger = (name: string = 'anonymous') => log.getLogger(name)
