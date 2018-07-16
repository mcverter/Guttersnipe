const fs = require('fs');
const rl = require('readline');
const Promise = require('bluebird');

// list files in text/ready directory
const freeganShareablesFile = __dirname + '/../../data/txt/ready/dumpstersNY.txt';
const fnbShareablesFile = __dirname + '/../../data/txt/ready/fnbNY.txt'
const pantryShareablesFile = __dirname + '/../../data/txt/ready/all_pantries.txt'

Promise.all([
  processSubcategoryFile(freeganShareablesFile, 'freegan'),
  processSubcategoryFile(fnbShareablesFile, 'food not bombs'),
  processSubcategoryFile(pantryShareablesFile, 'pantry'),
])
  .then(results=>{
    const allShareables = results.reduce((curr, acc)=>acc.concat(curr), []);
    console.log(allShareables)
  })


function getKVFromLine(line) {
  function cleanKey(key) {
    return key.toLowerCase().replace(/:/g, '')
  }

  const regExp = /^\s*(.*?:+)\s*(\w.*)\s*/
  const kvPair = line.match(regExp);
  if (!kvPair) {
    console.warn("ERROR no match for line", line);
  }
  return {
    key: cleanKey(kvPair[1]),
    value: kvPair[2]
  }
}

function processSubcategoryFile(filepath, subcategory) {
  return new Promise(function (resolve) {
    let subcategoryShareables = [];

    const subcategoryLineInterface = rl.createInterface({
      input: fs.createReadStream(filepath)
    })
    let shareable = new Object();
    let kv;

    subcategoryLineInterface.on('line', function (line) {
      // if blank line, skip regex
      if (line.match(/\w/)) {

        //   end old Shareable Record && start new Shareable Record
        if (line.startsWith('Name')) {
          subcategoryShareables.push(shareable);
          shareable = new Object();
          shareable['subcategory'] = subcategory;
          console.log('name line', line);
          shareable['name'] = getKVFromLine(line).value;
        }

        // if Key === 'Comment', add to comments array
        else if (line.startsWith('Comment')) {
          if (!shareable.comments) {
            shareable.comments = new Array();
          }
          shareable.comments.push(getKVFromLine(line).value);
        }

        // for Each line "Key:Value", add to Shareable Object shareable[key] = value
        else {
          kv = getKVFromLine(line);
          shareable[kv.key] = kv.value;
        }
      }
      resolve(subcategoryShareables);
    });
  })
}



