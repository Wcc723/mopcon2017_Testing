const request = require('request')
const config = require('../setting/config')

const getSheetData = function (shList, shKey, callback) {
  let shPath = config.spreadsheets.shPath
  let shCallback = 'public/values?alt=json'

  let path = `${shPath}${shKey}/${shList}/${shCallback}`
  return request({
    'url': path,
    'json': true
  }, callback)
}

const SheetCtrl = function (name) {
  let vm = this
  vm.name = name
  let key = config.spreadsheets[vm.name].shKey
  let shList = config.spreadsheets[vm.name].shList
  let shKey = config.spreadsheets[key]

  // getApi
  vm.data = {}
  vm.getData = () => {
    return new Promise((resolve, reject) => {
      getSheetData(shList, shKey, function (error, response, body) {
        vm.data = response.body.feed.entry
        return resolve(response.body.feed.entry)
      })
    })
  }

  // data = Google Sheet Data
  vm.getData()
}

module.exports = SheetCtrl
