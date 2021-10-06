// 1、package:
// activationEvents：用来定义插件激活的事件，或者说是条件，可以是文件后缀名，或者是命令等
// main：main表示入口文件
// contributes： contributes可以看作一种声明，比如contributes的commands，在文档中的这段话有体现出来："当调用命令时（从键绑定、从命令面板、任何其他菜单或以编程方式），VS Code 将发出 activationEvent onCommand:${command}"；也就是说，在接收到用户端发出的commands(指令)的时候，在commands有进行声明的，会去activationEvent中找到commands中的符合用户输入的command指令的行为并执行，默认在命令面板( Ctrl+Shift+P ) 中；而menus： 用来定义当鼠标选中某个文件的时候，所展示出来的菜单可选项，而menu中的command，表示选中该菜单栏时，所需要执行的命令，菜单栏的title，对应的是menu中的command在commands中的title