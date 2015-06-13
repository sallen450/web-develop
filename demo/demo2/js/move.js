/* =============================================
 * 描述：初始化界面
 *
 */
function $(id) {
    return document.getElementById(id);
}

// 根据格式生成html代码字符串
function generateHtmlString() {
    var str = '<div id="%s" class="%s"><div>';
    for (var i = 0; i < arguments.length; i++) {
        str = str.replace("%s", arguments[i]);
    }

    return str;
}

// 创建一个方块
function createSquare(i) {
    var id = 'square' + i;
    var oddRow = 1;
    var className = '';

    //oddRow=1为奇数行； 该行的第一个方块为白色
    //oddRow=0为偶数行； 该行的第一个方块为灰色
    if (Math.floor((i - 1) / 20) % 2 === 1) {
        oddRow = 0;
    }

    //奇数行，id为奇数； 偶数行，id为偶数； 设置为白色class
    if (i % 2 === oddRow) {
        className = 'square';
    }
    else {
        //奇数行，id为偶数； 偶数行，id为奇数； 设置为灰色class
        className = 'square bg-gray';
    }

    var htmlData = generateHtmlString(id, className);
    $('wrapper').insertAdjacentHTML('beforeend', htmlData);
}

/* =============================================
 * 描述：功能实现
 *
 */
var currentSelectSquareIndex = undefined;

// 撤销/重做 功能对象
var squareStack = function () {
    var index = 0;
    var stack = [];

    function pushElement(element) {
        stack = stack.slice(0, index + 1);
        stack[++index] = element;
    }

    function undoMove() {
        if (index !== 0) {
            clearSelectSquare(stack[index--]);
            selectSquare(stack[index]);
        }
    }

    function redoMove() {
        if (index < stack.length - 1) {
            clearSelectSquare(stack[index++]);
            selectSquare(stack[index]);
        }
    }

    function initStack(element) {
        index = 0;
        stack.push(element);
    }

    return {
        'add': pushElement,
        'undo': undoMove,
        'redo': redoMove,
        'init': initStack
    };

}();

// 清除之前选中的方块的蓝色
function clearSelectSquare(selector) {
    if (typeof selector === 'string') {
        $(selector).style.backgroundColor = '';
    }
    else if (typeof selector === 'object' && selector.id) {
        selector.style.backgroundColor = '';
    }
}

// 设置传入的方块元素背景为蓝色
function selectSquare(selector) {
    if (typeof selector === 'string') {
        $(selector).style.backgroundColor = 'blue';
        currentSelectSquareIndex = parseInt(selector.match(/\d+/)[0], 10);
    }
    else if (typeof selector === 'object' && selector.id) {
        selector.style.backgroundColor = 'blue';
        currentSelectSquareIndex = parseInt(selector.id.match(/\d+/)[0], 10);
    }
}

// 点击方块事件
function clickSquare() {
    clearSelectSquare('square' + currentSelectSquareIndex);
    selectSquare(this);
    squareStack.add(this.id);
}

// 点击左键
function clickLeft() {
    if (currentSelectSquareIndex % 20 !== 1) {
        clearSelectSquare('square' + currentSelectSquareIndex);
        currentSelectSquareIndex -= 1;
        selectSquare('square' + currentSelectSquareIndex);

        squareStack.add($('square' + currentSelectSquareIndex));
    }
    else {
        alert('already the left');
    }
}

// 点击上键
function clickUp() {
    if (Math.floor((currentSelectSquareIndex - 1) / 20) !== 0) {
        clearSelectSquare('square' + currentSelectSquareIndex);
        currentSelectSquareIndex -= 20;
        selectSquare('square' + currentSelectSquareIndex);

        squareStack.add($('square' + currentSelectSquareIndex));
    }
    else {
        alert('already the top');
    }
}

// 点击右键
function clickRight() {
    if (currentSelectSquareIndex % 20 !== 0) {
        clearSelectSquare('square' + currentSelectSquareIndex);
        currentSelectSquareIndex += 1;
        selectSquare('square' + currentSelectSquareIndex);

        squareStack.add($('square' + currentSelectSquareIndex));
    }
    else {
        alert('already the right');
    }
}

// 点击下键
function clickDown() {
    if (Math.floor((currentSelectSquareIndex - 1) / 20) !== 9) {
        clearSelectSquare('square' + currentSelectSquareIndex);
        currentSelectSquareIndex += 20;
        selectSquare('square' + currentSelectSquareIndex);

        squareStack.add($('square' + currentSelectSquareIndex));
    }
    else {
        alert('already the bottom');
    }
}

// keyCode
// up 38;  down 40;  right 39;  left 37;
// z 90;   y 89;
document.body.onkeydown = function (e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 37:
            clickLeft();
            break;
        case 38:
            clickUp();
            break;
        case 39:
            clickRight();
            break;
        case 40:
            clickDown();
            break;
        case 90:
            if (e.ctrlKey) {
                squareStack.undo();
            }
            break;
        case 89:
            if (e.ctrlKey) {
                squareStack.redo();
            }
            break;
        default:
            break;
    }
};

// 初始化界面函数
function renderPage(squareNumber) {
    for (var i = 1; i <= squareNumber; i++) {
        createSquare(i);
    }

    currentSelectSquareIndex = 1;
    var selectElement = $('square1');
    selectElement.style.backgroundColor = 'blue';
    squareStack.init(selectElement);
}

// 初始化函数，参数为方块总数
function init(squareNumber) {
    renderPage(squareNumber);

    // 给方块添加点击事件
    for (var i = 1; i <= squareNumber; i++) {
        var id = 'square' + i;
        $(id).onclick = clickSquare;
    }
}

init(200);