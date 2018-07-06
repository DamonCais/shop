import jsonp from 'jsonp'

export function toUPPer(str) {
  const reg = /_/
  if (reg.test(str)) {
    return str.toUpperCase()
  } else {
    const s = str.replace(/([A-Z])/g, '_$1').toUpperCase()
    return s.slice(0, 1) === '_' ? s.substr(1) : s
  }
}

// 获得单词解析
const WordMean = {
  a: 'getWordMean',
  c: 'search',
  list: '1,2,3,4,5,8,9,10,12,13,14,15,18,21,22,24,3003,3004,3005'
}
export function getWordMean(word) {
  console.log(word)
  WordMean['word'] = word
  WordMean['_'] = Math.round(new Date().getTime())
  let url = 'http://www.iciba.com/index.php?'
  let query = ''
  for (const o in WordMean) {
    query += `&${o}=${WordMean[o]}`
  }
  url += query.substring(1)
  return new Promise((resolve, reject) => {
    return jsonp(url, null, (err, data) => {
      console.log(data.baesInfo.symbols[0].parts[0].means[0])
      console.log(_(data, 'baesInfo.symbols'))

      if (err) {
        reject('err')
      }
      resolve(data.baesInfo.symbols[0].parts[0].means[0])
    })
  })
}

function _(value, path) {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined
}
