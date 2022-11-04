"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const resolve = (dir) => path_1.default.resolve(__dirname, dir);
/**
 * 配置
 */
exports.default = {
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
};
