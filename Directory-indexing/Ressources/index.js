const cs = require('cloudscraper')
const $ = require('cheerio')

const formattedDate = d => (
  `${[d.getMonth()+1, d.getDate(), d.getFullYear()].join('/')} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join(':')}`
)

const scrapePage = uri => (
  new Promise((resolve, reject) => (
    cs.get(uri, (err, res, body) => {
      if (uri.indexOf('README') === -1) {
        const rows = $('a', body)
        const urls = []
        Object.keys(rows).forEach((index) => {
          if (rows[index].attribs && rows[index].attribs.href !== '../' && rows[index].attribs.href !== 'README') {
            urls.push(`${uri}${rows[index].attribs.href}`)
          }
        })
        return resolve(urls)
      }
      return resolve(body)
    })
  ))
)


const scraper = async (list) => {
  let i = 0
  const newList = []
  if (!list || list.length === 0) return []
  do {
    if (list[i].indexOf('../') === -1 && list[i].indexOf('README') === -1) {
      const response = await scrapePage(list[i])
      newList.push(...response)
    }
    i += 1
  } while (i < list.length)
  return newList
}

const runIt = async () => {
  let prevList = null
  let nextList = ['http://192.168.18.130/.hidden/']
  const finalList = []
  do {
    finalList.push(...nextList)
    const tmp = await scraper(nextList)
    prevList = nextList
    nextList = tmp
  } while (prevList.length !== nextList.length)
  return finalList
}


const getReadme = async (list) => {
  let i = 0
  const responses = []
  if (!list || list.length === 0) return []
  do {
    const data = await scrapePage(`${list[i]}README`)
    responses.push({ uri: list[i], data })
    i += 1
  } while (i < list.length)
  return responses
}

console.log(`${formattedDate(new Date())}: scraping starts`)
runIt(null, ['http://192.168.18.130/.hidden/'])
  .then(urlList => getReadme(urlList))
  .then((response) => {
    response.forEach((res) => {
      if (
      res.data.indexOf('Toujours') === -1 &&
      res.data.indexOf('toujours pas') === -1 &&
      res.data.indexOf('Demande') === -1 &&
      res.data.indexOf('Tu veux') === -1
      ) console.log(res)
    })
    console.log(`${formattedDate(new Date())}: scraping ends`)
  })

