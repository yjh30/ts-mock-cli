import path from 'path'

const resolve = (dir:string) => path.resolve(__dirname, dir)

/**
 * 配置
 */
export default {
  // 文件输出目录（绝对路径）
  dist: resolve('../example/schema'),

  // 配置列表
  list: [
    {
      // 文件路径（绝对路径）
      file: resolve('../example/definations/index.ts'),

      // file文件中定义的类型名称列表
      typeNameList: ['IUser', 'IUserList', 'IPagingResponseData']
    }
  ]
}
