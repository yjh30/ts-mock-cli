"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockItem = exports.mock = void 0;
const json_schema_faker_1 = __importDefault(require("json-schema-faker"));
const TJS = __importStar(require("typescript-json-schema"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const settings = {
    required: true,
    defaultNumberType: 'integer'
};
const compilerOptions = {
    strictNullChecks: true,
};
function mock(configFile) {
    console.log((0, path_1.resolve)(__dirname, configFile));
    const config = require((0, path_1.resolve)(__dirname, configFile)).default;
    config.list.forEach(item => {
        mockItem(config.dist, item.file, item.typeNameList);
    });
}
exports.mock = mock;
/**
 * 针对ts声明文件中多个类型变量生成多个mock json文件
 * @param dist 文件输出目录
 * @param file ts声明文件绝对路径
 * @param typeNameList ts声明文件中的类型变量
 */
function mockItem(dist, file, typeNameList) {
    const program = TJS.getProgramFromFiles([(0, path_1.resolve)(file)], compilerOptions);
    typeNameList.forEach(typeName => {
        const schema = TJS.generateSchema(program, typeName, settings);
        json_schema_faker_1.default.resolve(schema, [], dist).then(data => {
            fs_1.default.writeFileSync((0, path_1.resolve)(dist, `${typeName}.json`), JSON.stringify(data, null, '\t'), 'utf8');
        });
    });
}
exports.mockItem = mockItem;
