// import '../common/vconsole.min.js';
import _ from 'lodash';

console.log(_);

console.log('Home');

const obj1 = {
  first: 'first'
};
const obj2 = {
  second: 'second'
};
const newObj = {};
Object.assign(newObj, obj1, obj2);