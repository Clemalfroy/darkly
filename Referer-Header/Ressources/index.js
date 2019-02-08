/*
  When navigating to http://192.168.18.130/index.php?page=e43ad1fdc54babe674da7c7b8f0127bde61de3fbe01def7d00f151c2fcca6d1c
  You can see a lot of useless text and a very useful information:
    You must cumming from : "https://www.nsa.gov/" to go to the next step
    Let's use this browser : "ft_bornToSec". It will help you a lot.
  
*/

const request = require('request')

const options = {
  url: 'http://192.168.18.130/index.php?page=e43ad1fdc54babe674da7c7b8f0127bde61de3fbe01def7d00f151c2fcca6d1c',
  headers: {
    'User-Agent': 'ft_bornToSec',
    'Referer': 'https://www.nsa.gov/'
  }
}

request(options, (error, response, body) => {
  console.log(error)
  console.log(response)
  console.log(body) // Contains flag at the end
})
