import chalk, { Chalk } from 'chalk'
import log, { LogLevel, setDefaultLevel } from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

type Levels = keyof LogLevel;

const defaultLevel: Levels = 'INFO'

setDefaultLevel(defaultLevel)

const colors: Record<Levels, Chalk> = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
  SILENT: chalk.gray
}

prefix.reg(log)

log.enableAll()

prefix.apply(log, {
  format(_level, _name, _time) {
    const now = new Date()

    const date = `${now.getDate()}-${now.getMonth()}`

    const time = _time.toString()

    const level =
      colors[_level.toUpperCase() as Levels](_level) +
      // Add an extra space if level == INFO or WARN
      (_level.length < 5 ? ' ' : '')

    const name = chalk.green(_name)

    return `${date} ${time} ${level} ${name}:`
  }
})

export function newLogger (name: string = 'Subsocial', level?: Levels) { 
  const logger = log.getLogger(name)
  logger.setLevel(level || defaultLevel)
  return logger
}

newLogger.setDefaultLevel = setDefaultLevel
