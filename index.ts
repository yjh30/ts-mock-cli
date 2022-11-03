import jsf from 'json-schema-faker'
import * as TJS from "typescript-json-schema"
import { resolve } from "path"
import fs from 'fs'

interface IConfig {
  dist: string
  list: Array<{
    file: string
    typeNameList: string[]
  }>
}

const settings: TJS.PartialArgs = {
  required: true,
  defaultNumberType: 'integer'
}

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
}

export function mock(configFile: string) {
  console.log(resolve(__dirname, configFile))
  const config: IConfig = require(resolve(__dirname, configFile)).default
  config.list.forEach(item => {
    mockItem(config.dist, item.file, item.typeNameList)
  })
}

/**
 * 针对ts声明文件中多个类型变量生成多个mock json文件
 * @param dist 文件输出目录
 * @param file ts声明文件绝对路径
 * @param typeNameList ts声明文件中的类型变量
 */
export function mockItem(dist: string, file: string, typeNameList: string[]) {
  const program = TJS.getProgramFromFiles(
    [resolve(file)],
    compilerOptions,
  )

  typeNameList.forEach(typeName => {
    const schema = TJS.generateSchema(program, typeName, settings)

    jsf.resolve(schema as any, [], dist).then(data => {
      fs.writeFileSync(resolve(dist, `${typeName}.json`), JSON.stringify(data, null, '\t'), 'utf8')
    })
  })
}
