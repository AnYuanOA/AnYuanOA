const core = require('./es7.js');

for (let item in core) {
  let obj = core[item];
  let virtual = obj.virtual || {};

  for (let i in obj) {
    if (i === 'virtual') continue;
    
    if (virtual.hasOwnProperty(i)) {

    } else {
      
      //静态方法
      switch (item) {
        case "Object":

          if (!Object[i]) {
            Object[i] = obj[i];
          }
          break;
      }

    }
  }
}

module.exports = core