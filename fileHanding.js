//TODO:想做一个类似日志的txt文件，用来保存每次更改的记录，可是面对mac和windows的目录差异，如何确定放置位置？
// TODO: 考虑是否要做文件类型筛选

const FileSystem = require('fs');

function isFolder(path) { //判断是否是文件夹
  return FileSystem.lstatSync(path).isDirectory();
}
function handleMain(path, options, msg){
  return new Promise((resolve,reject) => {
    if (isFolder(path)) {//如果是文件夹，开始递归
      const filePathList = FileSystem.readdirSync(path);
      console.log('文件列表',filePathList,path);
      if (filePathList.length) {
        for (let index = 0; index < filePathList.length; index++) {
          const childPath = `${path}/${filePathList[index]}`;
          handleMain(childPath,options, msg)
        }
      }else{
        reject('文件夹为空')
      }
    }else{
      const result = readFile(path, options, msg)
      result.state ? resolve() : reject(result.errCode);
    }
  })
}
function readFile(path, options, msg) {
    if (!path || !msg) {
      return {
        state: false,
        errCode: '当前状态异常'
      }
    }
    if (!FileSystem.existsSync(path)) {// 判断文件是否存在
      return {
        state: false,
        errCode: '现有路径没有找到文件'
      }
    }
    try {
      const fileData = FileSystem.readFileSync(path, options);
      const fileCodeList = fileData.toString().split('\n'); //将Buffer转为string类型后以行为单位分割
      clearHandleFile(path, fileCodeList, options, msg); // 路径、代码行数组、字符类型、用户输入文本
      return {
        state: true
      }
    } catch (error) {
      return {
        state: false,
        errCode: `未知错误${error}`
      }
    }
}

function clearHandleFile(path, fileStringList, options, msg) {
  const handleCodeList = [];
  let isUpdate = false;
  for (let index = 0; index < fileStringList.length; index++) {
    const element = fileStringList[index];
    if (isAccordCondition(element.replace(/(^\s*)/g, ""), msg)) { //去除左边空格
      const insertIndex = element.search(msg);
      const handleString = `${element.slice(0,insertIndex)}// ${element.slice(insertIndex)}`;
      handleCodeList.push(handleString);
      isUpdate = true;
    } else {
      handleCodeList.push(element)
    }
  }
  if (isUpdate) { //如果该文件进行了处理则重新写入，没有变更的话不写入
    const handleFileStr = handleCodeList.join('\n');
    FileSystem.writeFileSync(path, handleFileStr, options);
  }
}

function isAccordCondition(str, msg) {
  //TODO: 此处判断注释太过单一，后续需将/*   */考虑在内
  if (/^\/\//.test(str)) { //如果是注释则返回false，不做改变
    return false
  }
  let exp = RegExp(`^${msg}`); //采用输入框动态传入，匹配开头
  return exp.test(str);
}
module.exports = {
  readFile,
  handleMain
}