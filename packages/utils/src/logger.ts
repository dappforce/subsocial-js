import * as winston from 'winston'
import chalk from 'chalk'

export const logFormat = (label: string) => winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.label({ label: label }),
  winston.format.align(),
  winston.format.metadata({ fillExcept: [ 'message', 'level', 'timestamp', 'label' ] }),
  winston.format.printf(
    (info) => {
      const data = new Date(info.timestamp)
      return `[${data.toLocaleTimeString()}:${data.getMilliseconds()}] ${info.level} ${chalk.bold(label)}:${info.message} ${info.metadata}`
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
  return new winston.transports.Console(options)
}
