// 判断数据类型
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]'   : 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

// 判断参数是否是其中之一
function oneOf(value, validList) {
  for (let i = 0, len = validList.length; i < len; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

// 将驼峰式命名改为用‘-’分割的命名方式，并全变为小写
function camelcaseToHyphen(str) {
  return str.replace(/(a-z)(A-Z)/g, '$1-$2').toLowerCase();
}

// 首字母变成大写
function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

// 深拷贝(支持多层嵌套)
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        o[i] = deepCopy(data[i]);
      }
    }
  }
  return o;
}

// 滚动到顶部（动画）
function scrollTop(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000/60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) return;

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}

// 合并两个有序数组，结果为一个有序数组
function sort(arr1, arr2) {
  let min1, min2, i = 0, j = 0, result = [];
  for (let n = 0; n < arr1.length + arr2.length; n ++) {
    min1 = arr1[i] || Infinity;
    min2 = arr2[j] || Infinity;
    if (min1 < min2) {
      result.push(min1);
      i++;
    } else if (min1 >= min2) {
      result.push(min2);
      j++;
    }
  }
  return result;
}

// 获取当前的时间yyyy-MM-dd HH:mm:ss
const obtainDate = (d) => {

  let date = d ? new Date(d) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minu = date.getMinutes();
  let second = date.getSeconds();

  //判断是否满10,并 push 到目标数组中
  let arr = [month, day, hours, minu, second];
  let res = [];
  arr.forEach((item, index) => {
    res.push(item < 10 ? "0" + item : item);
  });

  return year + '-' + res[0] + '-' + res[1] + ' ' + res[2] + ':' + res[3] + ':' + res[4];

}

// console.log(obtainDate('2018-05-18 09:23:32'));

// 检测是否是数组
const isArray = (arr) => {
  if (!arr) return false;
  if (Array.isArray) {
    return Array.isArray(arr);
  } else {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
};

// 判断字符串是否为数字
const isRealNum = (num) => {
  var reg = /^[0-9]+.?[0-9]*$/;
  // var reg = /^[1-9]+[0-9]*]*$/; // 正整数
  if (!reg.test(num)) {
    return false;
  }
  return true;
}

// console.log(isRealNum('000'));
// console.log(isRealNum(000));
// console.log(isRealNum('   '));

// console.log(isArray([1,2,3]));

// 数组去重set方法
const changeReArr = (arr) => {
  // 两种方法都可以
  // return Array.from(new Set(arr));
  return [...new Set(arr)];
}

// console.log(changeReArr([1, 2, 3, 232, 1, 1, 4, 2, 3]));

// 纯数组排序
const orderArr = (arr) => {
  return arr.sort((a, b) => {
    return a - b;
  });
}

// console.log(orderArr([1, 2, 3, 232, 1, 1, 4, 2, 3]));

/**
 * 数组对象排序
 * @param {Array} arr 原数组
 * @param {String} property 排序依据的对象属性
 * @return {Array}  排序之后的数组
 */
const orderObjArr = (arr, property) => {
  return arr.sort((a, b) => {
    let value1 = a[property];
    let value2 = b[property];
    return value1 - value2;
  });
}

// console.log(orderObjArr([
//   {
//     value: 1
//   }, {
//     value: 2
//   }, {
//     value: 10
//   }, {
//     value: 3
//   }
// ], 'value'));

/**
 * 如果数组的每一项都满足则返回true, 如果有一项不满足返回false, 终止遍历
 * @param {Array} arr 原数组
 * @param {Function} fn 需要判断的函数，数组的每一项会当作参数回传给fn中
 * @return {Boolean} 判断结果
 */
const allTrueArr = (arr, fn) => {
  return arr.every(item => {
    return fn(item);
  });
}

// console.log(allTrueArr([1,2,3,4,5,2], item => item < 5));

/**
 * 如果数组的每一项都满足则返回false,如果有一项满足返回true,终止遍历
 * @param {Array} arr 原数组
 * @param {Function} fn 需要判断的函数，数组的每一项会当作参数回传给fn中
 * @return {Boolean} 判断结果
 */
const oneTrueArr = (arr, fn) => {
  return arr.some(item => {
    return fn(item);
  });
}

// console.log(oneTrueArr([1,2,3,4,5,2], item => item < 5));

// 对象遍历
const traverseObj = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      console.log(element);
    }
  }
}

// traverseObj({
//   value: 1,
//   name: 'hs',
//   age: 25
// });

// 修改对象的数据属性
const modifyObjAttr = () => {
  let person = {
    name: '张三',
    age: 30
  };

  Object.defineProperty(person, 'name', {
    writable: false, // 表示能否修改属性的值
    value: '李四', // 包含该属性的数据值。默认为undefined
    configurable: false, // 设置false就不能对该属性修改
    enumerable: true // 表示能否通过for-in循环返回属性
  });

  person.name = 'hs'; // 修改无效
  console.log(person);

}

// modifyObjAttr();

const defineObjAccess = () => {

  let personAccess = {
    _name: '张三', //_表示是内部属性,只能通过对象的方法修改
    editor: 1
  }

  Object.defineProperty(personAccess, 'name', {
    get: function () {
      return this._name;
    },
    set: function (newName) {
      if (newName !== this._name) {
        this._name = newName;
        this.editor++;
      }
    }
    //如果只定义了get方法则改对象只能读
  })

}

// 格式化金额
const formatMoney = (money) => {
  // 正则方式
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // 正常方式
  // return money.split('').reverse().reduce((prev, next, index) => {
  //   return ((index % 3) ? next : (next + ',')) + prev;
  // });
}

// console.log(formatMoney('1234567890'));

// 两个整数交换数值
const exchangeNumber = (a, b) => {
  a ^= b;
  b ^= a;
  a ^= b;
  return [a, b];
}
console.log(exchangeNumber(13123123, 2));