import * as winston from 'winston'
import chalk from 'chalk'
import { stringify } from 'circular-json'
import isEmpty from 'lodash.isempty'

require('dotenv').config()

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
      const metaStr = isEmpty(metadata) ? '' : ' ' + stringify(metadata, null, 2)
      return `[${date.toLocaleTimeString()}.${millis}] ${level} ${chalk.bold(label)}: ${message}${metaStr}`
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
