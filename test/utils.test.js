const { expect } = require('chai');
const {
  typeOf,
  oneOf,
  camelcaseToHyphen,
  hyphenToCamelcase,
  firstUpperCase,
  deepCopy,
  sort,
  formatDate,
  isArray,
  isRealNum,
  changeReArr,
  orderArr,
  orderObjArr,
  formatMoney,
  exchangeNumber,
  isEmptyObj,
  get
} = require('../utils');

describe('#utils', () => {
  describe('typeOf', () => {
    it('should return boolean when Boolean', () => {
      expect(typeOf(false)).to.equal('boolean');
    });

    it('should return number when Number', () => {
      expect(typeOf(123));
    });

    it('should return string when String', () => {
      expect(typeOf('this is a string.')).to.equal('string');
    });

    it('should return function when Function', () => {
      expect(typeOf(function () {})).to.equal('function');
    });

    it('should return array when Array', () => {
      const arr = [1, 2, 3];
      expect(typeOf(arr)).to.equal('array');
    });

    it('should return date when Date', () => {
      expect(typeOf(new Date())).to.equal('date');
    });

    it('should return regExp when RegExp', () => {
      expect(typeOf(/.*/)).to.equal('regExp');
      expect(typeOf(new RegExp('.*'))).to.equal('regExp');
    });

    it('should return undefined when Undefined', () => {
      expect(typeOf(undefined)).to.equal('undefined');
    });

    it('should return null when Null', () => {
      expect(typeOf(null)).to.equal('null');
    });

    it('should return object when Object', () => {
      const obj = {a: 1};
      expect(typeOf(obj)).to.equal('object');
    });
  });

  describe('oneOf', () => {
    it('should return true when the array has someone element', () => {
      expect(oneOf('Jenny', ['Tom', 'Jenny', 'Tomas', 'Curry'])).to.equal(true);
    });

    it('should return false when the array not has someone element', () => {
      expect(oneOf('Micko', ['Tom', 'Jenny', 'Tomas', 'Curry'])).to.equal(false);
    });
  });

  describe('camelcaseToHyphen', () => {
    it('should return this-is-a-string when thisIsAString', () => {
      expect(camelcaseToHyphen('thisIsAString')).to.equal('this-is-a-string');
    });
  });

  describe('hyphenToCamelcase', () => {
    it('should return thisIsAString when this-is-a-string', () => {
      expect(hyphenToCamelcase('this-is-a-string')).to.equal('thisIsAString');
    });
  });

  describe('firstUpperCase', () => {
    it('should return Abc when abc', () => {
      expect(firstUpperCase('abc')).to.equal('Abc');
    });
  });

  describe('deepCopy', () => {
    it('should return false when deep copy a obj or array', () => {
      const obj = {
        value: '111',
        data: [1, 2, 3],
        props: {
          name: 'Jenny'
        }
      };
      const cpObj = deepCopy(obj);
      cpObj.value = '222';
      cpObj.data = [4, 5, 6, 7, 8];
      cpObj.props.name = 'Tom';
      expect(obj.value === '111' && obj.data.length === 3 && obj.props.name === 'Jenny').to.equal(true);
      expect(cpObj.value === '222' && cpObj.data.length === 5 && cpObj.props.name === 'Tom').to.equal(true);
    });
  });

  describe('sort', () => {
    it('should return [1, 2, 3, 4, 6, 10] when [1, 6] and [2, 3, 4, 10]', () => {
      const arr1 = [1, 6];
      const arr2 = [2, 3, 4, 10];
      expect(sort(arr1, arr2)).to.deep.equal([1, 2, 3, 4, 6, 10]);
    });
  });

  describe('formatDate', () => {
    it('should return 2019-08-18 00:00:00 when new Date("2019/08/18")', () => {
      expect(formatDate(new Date('2019/08/18'), 'yyyy-MM-dd hh:mm:ss')).to.equal('2019-08-18 00:00:00');
    });
  });

  describe('isArray', () => {
    it('should return false when "this is a string."', () => {
      expect(isArray('this is a string.')).to.equal(false);
    });

    it('should return false when isArray()', () => {
      expect(isArray()).to.equal(false);
    });

    it('should return true when [1, 2, 3])', () => {
      expect(isArray([1, 2, 3])).to.equal(true);
    });
  });

  describe('isRealNum', () => {
    it('should return false when "111this is a string.111"', () => {
      expect(isRealNum('111this is a string.111')).to.equal(false);
    });

    it('should return true when "1231223")', () => {
      expect(isRealNum('1231223')).to.equal(true);
    });
  });

  describe('changeReArr', () => {
    it('should return [1, 4, 2, 3, 5] when [1, 4, 2, 3, 5, 3, 2, 3, 4, 1, 2, 3, 1]', () => {
      const arr = [1, 4, 2, 3, 5, 3, 2, 3, 4, 1, 2, 3, 1];
      expect(changeReArr(arr)).to.deep.equal([1, 4, 2, 3, 5]);
    });
  });

  describe('orderArr', () => {
    it('should return [1, 2, 3, 4, 5] when [1, 4, 2, 3, 5]', () => {
      const arr = [1, 4, 2, 3, 5];
      expect(orderArr(arr)).to.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe('orderObjArr', () => {
    it('should return [1, 2, 3, 4, 5] when [1, 4, 2, 3, 5]', () => {
      const arr = [
        {
          value: 1
        }, {
          value: 2
        }, {
          value: 10
        }, {
          value: 3
        }
      ];
      expect(orderObjArr(arr, 'value')).to.deep.equal([
        {
          value: 1
        }, {
          value: 2
        }, {
          value: 3
        }, {
          value: 10
        }
      ]);
    });
  });

  describe('formatMoney', () => {
    it('should return "1,234,567,890" when "1234567890"', () => {
      expect(formatMoney('1234567890')).to.equal('1,234,567,890');
    });
  });

  describe('exchangeNumber', () => {
    it('should return [100, 2] when exchangeNumber(2, 100)', () => {
      expect(exchangeNumber(2, 100)).to.deep.equal([100, 2]);
    });
  });

  describe('isEmptyObj', () => {
    it('should return true when isEmptyObj({})', () => {
      expect(isEmptyObj({})).to.equal(true);
    });

    it('should return true when isEmptyObj({a: 1})', () => {
      expect(isEmptyObj({a: 1})).to.equal(false);
    });
  });

  describe('get', () => {
    it('should return 2 when get(c, "a.b[1]")', () => {
      const c = {a: {b: [1, 2, 3]}};
      expect(get(c, 'a.b[1]')).to.equal(2);
    });
  });

});