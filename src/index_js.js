
// 通过声明模块所需要的依赖, webpack能够利用这些信息去构建依赖图, 然后使用图生成一个优化过的, 会以正确顺序执行的bundle
import _ from 'lodash';
import Icon from './icon.png';
import printMe from './print';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    /**
     * 如果未import loadsh, index.js文件执行之前, 还依赖于页面中引入的lodash.
     * 之所以说是隐式的是因为index.js并未显示声明需要引入lodash, 只是假定推测已经存在一个全局变量“_“
     * 这种方式管理Javascript项目会有一些问题:
     * 1. 无法立即体现, 脚本的执行依赖于外部扩展库
     * 2. 如果依赖不存在, 或者引入顺序错误, 应用程序将无法正常运行
     * 3. 如果依赖被引入但是并没有使用, 浏览器将被迫下载无用代码
     */
    element.innerHTML = _.join(['hello', 'webpack'], '');
    element.classList.add('hello');
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());


if(module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printme module');
        printMe();
    })
}