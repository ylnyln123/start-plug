const FileSystem = require('fs');
function fileTypeJudge() {
    console.log(FileSystem);  }
function readFile(path,options,msg){
  const fileData = FileSystem.readFileSync(path,options);
  const fileCodeList = fileData.toString().split('\n');//将Buffer转为string类型后以行为单位分割
  console.log('文件列表',fileCodeList);
  handleFile(path,fileCodeList,options, msg)
}
function handleFile(path,fileStringList,options, msg){
  const handleCodeList = [];
  let isUpdate = false;
  for (let index = 0; index < fileStringList.length; index++) {
    const element = fileStringList[index];
    if (isAccordCondition(element.replace(/(^\s*)/g, ""))) {//去除左边空格
      const insertIndex = element.search('console');//TODO:先用console，后续采用动态传入
      const handleString = `${element.slice(0,insertIndex)}// ${element.slice(insertIndex)}`;
      handleCodeList.push(handleString);
      isUpdate = true;
    }else{
      handleCodeList.push(element)
    }
  }
  if (isUpdate) {//如果该文件进行了处理则重新写入

    const handleFileStr = handleCodeList.join('\n');
    FileSystem.writeFileSync(path,handleFileStr,options)
  }
}
function isAccordCondition(str){
  //TODO: 此处判断注释太过单一，后续需将/*   */考虑在内
  if ( /^\/\//.test(str)) {//如果是注释则返回false，不做改变
    return false
  }
  let exp = /^console.log/;//TODO: 后续考虑采用输入框动态传入，动态生成正则
  return exp.test(str);
}
module.exports = {
  fileTypeJudge,
  readFile
}