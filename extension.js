// The module 'vscode' contains the VS Code extensibility API模块'vscode'包含VS Code扩展API  
// Import the module and reference it with the alias vscode in your code below导入模块并使用下面代码中的别名vscode引用它  
const vscode = require('vscode');
const FileHanding = require('./fileHanding')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('context',context);
  //TODO : 在package.json中的activationEvents来定义插件被激活的条件 
  // 这一行代码只会在你的扩展被激活时执行一次  
  console.log('Congratulations, your extension "clear-custom-code" is now active!');
  vscode.window.showInformationMessage('插件已被激活');
  // 该命令已经在包中定义。 json文件  
  // 现在使用registerCommand提供命令的实现  
  // 参数必须与package.json中的command字段匹配  
  let codeClear = vscode.commands.registerCommand('custom-code.clear', (params) => {
    vscode.window.showInputBox({
      password: false,
      placeHolder: '请输入需要将其注释的内容(逐行匹配，匹配开头，忽略空格)',
    }).then(msg => {
      if (msg) {
        const fileOptions = {
          encoding: 'utf-8'
        };
        FileHanding.handleMain(params.fsPath, fileOptions,`${msg}`).then(res => {
          vscode.window.showInformationMessage('文件已更新，可以进行查看咯');
        },err => {
          vscode.window.showErrorMessage(err)
        })
      }
    })
  });

  context.subscriptions.push(codeClear);
}

// 当您的扩展被停用时，将调用此方法  
function deactivate() {}

module.exports = {
  activate,
  deactivate
}