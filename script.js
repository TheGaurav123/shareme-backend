const cron = require('node-cron')
const shell = require('shelljs')
const scheduler = require('./scheduler/scheduler')


cron.schedule('* * 23 * * *', scheduler)