// The module 'vscode' contains the VS Code extensibility API模块'vscode'包含VS Code扩展API  
// Import the module and reference it with the alias vscode in your code below导入模块并使用下面代码中的别名vscode引用它  
const vscode = require('vscode');
const FileHanding = require('./fileHanding')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  //TODO : 在package.json中的activationEvents来定义插件被激活的条件 
  // This line of code will only be executed once when your extension is activated这一行代码只会在你的扩展被激活时执行一次  
  console.log('Congratulations, your extension "start-plug" is now active!');
  vscode.window.showInformationMessage('插件已被激活');
  FileHanding.fileTypeJudge();
  // The command has been defined in the package.json file该命令已经在包中定义。 json文件  
  // Now provide the implementation of the command with  registerCommand现在使用registerCommand提供命令的实现  
  // The commandId parameter must match the command field in package.json commanddid参数必须与package.json中的command字段匹配  
  let disposable = vscode.commands.registerCommand('start-plug.helloWorld', () => {

    // The code you place here will be executed every time your command is executed您在这里放置的代码将在每次执行命令时执行  
    // Display a message box to the user显示消息框给用户  
    vscode.window.showInformationMessage('Hello World from yln-plug!');
  });
  let removeConsole = vscode.commands.registerCommand('invalid-code-remover.removeConsole', (params) => {
    console.log('!!', params);
    vscode.window.showInputBox({
      password: false,
      placeHolder: '请输入需要注释的内容(忽略空格)',
    }).then(msg => {
      console.log('当前输入', msg);
      const fileOptions = {
        encoding: 'utf-8'
      };
      FileHanding.readFile(params.fsPath, fileOptions,msg)
    })


    // vscode.window.showInformationMessage('removeConsole from yln-plug!');
  });
  let removeDebugger = vscode.commands.registerCommand('invalid-code-remover.removeDebugger', () => {
    vscode.window.showInformationMessage('removeDebugger from yln-plug!');
  });

  context.subscriptions.push(disposable, removeConsole, removeDebugger);
}

// this method is called when your extension is deactivated当您的扩展被停用时，将调用此方法  
function deactivate() {}

module.exports = {
  activate,
  deactivate
}