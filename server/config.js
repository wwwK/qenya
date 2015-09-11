'use strict'

exports.DEFAULTDB = "hydra"

exports.MONGO = {
  host: 'localhost',
  port: 27017,
  db: exports.DEFAULTDB,
  max: 100,
  min: 1,
  timeout: 30000,
  log: false
}

exports.KOABODY = {
  maxFields: 20
}