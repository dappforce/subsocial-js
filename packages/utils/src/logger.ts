import * as winston from 'winston'
import BrowserConsole from 'winston-transport-browserconsole';
import chalk from 'chalk'

export const logFormat = (label: string) => winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.label({ label: label }),
  winston.format.align(),
  winston.format.printf(
    (info) => {
      const data = new Date(info.timestamp)
      return `[${data.toLocaleTimeString()}:${data.getMilliseconds()}] ${info.level} ${chalk.bold(label)}:${info.message}`
    }
  )
)

export const newLogger = (name: string, options?: winston.LoggerOptions) => {
  return winston.createLogger({
    ...options,
    format: logFormat(name),
    transports: newTransport({ level: options?.level || process.env.LOG_LEVEL || 'info' })
  })
}

const newTransport = (options?: winston.transports.ConsoleTransportOptions) => {
  return (typeof window === 'undefined')
    ? new winston.transports.Console(options)
    : new BrowserConsole(options)
}
