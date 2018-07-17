const fs = require('fs');
const rl = require('readline');
const Promise = require('bluebird');
const NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDh9h2rdiMnuvj3k5Ok82QsXufA5HuTkjs', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

/*const geocoder = require('@google/maps').createClient({
  key: 'AIzaSyDh9h2rdiMnuvj3k5Ok82QsXufA5HuTkjs'
});
*/
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
    const allShareables = results.reduce((acc, curr)=>acc.concat(curr.slice(1)), []);
    return allShareables;
  })
  .then(shareables =>{
      let allShareablesWithGeocode = []
      //console.log(shareables);
      function findGeocodes() {
        if (shareables.length === 0) {
          // console.log(allShareablesWithGeocode);
          fs.writeFileSync(__dirname + '/geocodedShareables.json', JSON.stringify(allShareablesWithGeocode, null, 2), 'utf-8');
          return allShareablesWithGeocode;
        }
        else {
          const shareable = shareables.shift();
          let timeoutDuration;
          if (shareables.length % 50 === 0) {
            timeoutDuration = 60000
          }
          else if (shareables.length % 7 === 0) {
            timeoutDuration = 10000
          } else {
            timeoutDuration = 2000
          }
          setTimeout(function(){
            geocoder.geocode(`${shareable.name}, ${shareable.address}`)
              .then(result=>{
                const resultAddress = result[0].formattedAddress;
                const latitude = result[0].latitude;
                const longitude = result[0].longitude;
                allShareablesWithGeocode.push({...shareable, address: resultAddress, longitude, latitude});
                console.log('shareables remaining', shareables.length);
                return findGeocodes();
              })
              .catch(error=>{
                console.error('error', error, 'shareable', shareable);
                return findGeocodes();
              })

          }, timeoutDuration)
        }
      }
      return findGeocodes();
    }
  )

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


          /*          if (kv.key === 'address') {
                      setTimeout(function () {
                          geocoder.geocode({address: `${shareable.address}`},
                            function (err, response) {
                            if (err) {
                              console.error("error", err)
                            } else {
                              let location = response.json.results[0].geometry.location
                              shareable.latitude = location.lat;
                              shareable.longitude = location.lng;
                              console.log('shareable', shareable)
                              subcategoryShareables.push(shareable);
                            }
                            })
                        }, 5000);

                    } */
        }
      }
      resolve(subcategoryShareables);
    });
  })
}


/*
// Geocode an address.
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});
 */
/*
(06:28:08 PM) The topic for ##javascript is: JavaScript is *not* Java. | Just ask your question. | Say "!mdn abc" for docs on "abc". | Don't paste code in the channel.
(06:28:08 PM) Topic for ##javascript set by Maxdamantus at 03:32:03 AM on 05/05/2018
(06:28:19 PM) jhaenchen: mk
(06:28:45 PM) nomic left the room (quit: Quit: Leaving).
(06:28:58 PM) indigoblue: sadfasdfasdf
(06:29:08 PM) ozzhates [~ozz@199.21.149.141] entered the room.
(06:30:01 PM) roadrunneratwast: Hi Javascripters.  I have some confusion with Promises and callbacks. My code reads files and then constructs an array of objects based on file contents.  THis was done using Promises.  But I now added on a geocoder call within these promises which is also async.  Now I am very confused about control flow.  Can you please look here:  https://gist.github.com/mcverter/b82deed01c0bdbf826b7d09b20a333e8
(06:30:18 PM) kapil___ left the room (quit: Quit: Connection closed for inactivity).
(06:30:29 PM) niggler left the room.
(06:30:30 PM) Sharaal [~sharaal@2a06:7500:0:313:a5de:7989:84cd:5b62] entered the room.
(06:31:09 PM) jottr_ [~jottr@unaffiliated/jottr] entered the room.
(06:32:05 PM) Tazmain left the room (quit: Quit: Leaving).
(06:32:18 PM) Jobava left the room (quit: Quit: Connection closed for inactivity).
(06:32:28 PM) devsnek: you can replace that `shareable = new Object();` with `shareable = { subcategory, name: getKVFromLine(line).value };`
(06:33:16 PM) progysm: roadrunneratwast, if you enter the geocode(..) callback, you need to call the resolve()
(06:33:35 PM) roadrunneratwast: call the resolve from within the callback?
(06:33:50 PM) roadrunneratwast: call the Promise resolve() from the geocoder callback?
(06:34:15 PM) progysm: that's where you have access to the data
(06:34:24 PM) roadrunneratwast: yes
(06:35:14 PM) Sharaal left the room (quit: Ping timeout: 256 seconds).
(06:35:26 PM) Shogil left the room (quit: Quit: Leaving).
(06:35:43 PM) roadrunneratwast: but the Promise resolves once the entire array of shareables is processed.  The geocoder only processes one shareable at a time
(06:35:59 PM) jottr_ left the room (quit: Ping timeout: 240 seconds).
(06:36:17 PM) progysm: right now you are only pushing one shareable at line 90
(06:36:19 PM) roadrunneratwast: Maybe I need to use Promise.all somehow?
(06:36:43 PM) rehat left the room (quit: Ping timeout: 252 seconds).
(06:36:44 PM) roadrunneratwast: ok
(06:37:31 PM) progysm: if you have many data, then you push many promise inside an array, then you return Promise.all(someArray)
(06:37:39 PM) roadrunneratwast: ok
(06:37:48 PM) nine_milli_: man creating a JIT is no joke
(06:37:50 PM) veid [~veid@c-73-97-164-11.hsd1.wa.comcast.net] entered the room.
 */
