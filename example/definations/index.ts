export interface IUser {
  /**
   * 字符串：长度限制
   * @minLength 2
   * @maxLength 10
   */
  name: string

  /**
   * 中文字符串：长度限制；[去我而他与哦怕]{2,10}这种正则实现不起作用
   * @pattern (?:去|我|而|他|与|哦|怕|是|对|方|过|后|就|哭|了){2,10}
   */
  chineseName: string

  /**
   * 字符串：正则匹配手机号码
   * @pattern ^1\d{10}$
   */
  mobile: string

  /**
   * 字符串：其他内置格式
   * 内置格式还有 日期date，时间time，日期时间date-time，主机名hostname，IP地址ipv4，资源标识符uri，正则regex
   * @format email
   */
  email: string

  /** 数字：设置值的范围
   * @minimum 10
   * @maximum 100
   */
  height: number

  /**
   * 数字：设置值的范围，10的倍数，模拟时间戳Date.now()
   * @minimum 1667394203287
   * @maximum 1668431201403
   * @multipleOf 10
   */
  timestamp: number

  /**
   * 简单数组
   */
  numArray: Array<number>

  /**
   * 元组
   */
  tupleArray: [
    string,
    number,
    boolean
  ]

  /**
   * otherInfo 对象成员必须有一个是固定，否则生成的成员名及值可能都是随机
   */
  otherInfo: {
    /**
     * 字符串：正则匹配身份证号码
     * @pattern ^\d{15}$|^\d{17}(\d|x|X)$
     */
    idCard: string
    hobby?: '音乐' | '电影' | '篮球' | '足球' | '羽毛球'
    /**
     * @minimum 2
     * @maximum 100
     */
    familyMembers?: number
  },
}

/**
 * 每页请求数
 * @minItems 20
 * @maxItems 20
 */
export type IUserList = IUser[]

/**
 * 分页响应数据
 */
export interface IPagingResponseData {
  records: IUserList,
  /**
   * 总条数
   * @minimum 100
   * @maximum 100
   */
  total: number
}
