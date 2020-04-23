import * as winston from 'winston'
import chalk from 'chalk'
import CitcularJSON from 'circular-json';

export const logFormat = (label: string) => winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.label({ label: label }),
  winston.format.splat(),
  winston.format.simple(),
  winston.format.metadata({ fillExcept: [ 'timestamp', 'level', 'label', 'message' ] }),
  winston.format.printf(
    ({ timestamp, level, label, message, metadata }) => {
      const date = new Date(timestamp)
      const millis = date.getMilliseconds()
      return `[${date.toLocaleTimeString()}.${millis}] ${level} ${chalk.bold(label)}: ${message} ${CitcularJSON.stringify(metadata, null, 2)}`
    }
  )
)

const newTransport = (options?: winston.transports.ConsoleTransportOptions) => {
  return new winston.transports.Console(options)
}

export const newLogger = (name: string, options?: winston.LoggerOptions) => {
  return winston.createLogger({
    ...options,
    format: logFormat(name),
    transports: newTransport({ level: options?.level || process.env.LOG_LEVEL || 'info' })
  })
}
