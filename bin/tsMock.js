#!/usr/bin/env node

const { program } = require('commander')
const { version } = require('../package.json')
const { mock } = require('../index')

program
  .version(`${version}`, '-v, --version', '当前版本')
  .option('-c, --config <configFilePath>', '配置文件 { dist, list: Array<{file, typeNameList}> }')

program.parse(process.argv)

const { config: configFilePath } = program.opts()

if (!configFilePath) {
  console.error('缺少配置文件参数')
  process.exit(1)
}

mock(configFilePath)
