var $ = require('jquery')
/**
 * 将值为null的置为''
 * @param {Object} key
 */
function format(key) {
    for (var prop in key) {
        if (!key[prop] || key[prop] === 'null') {
            key[prop] = ''
        }
    }
    return key
}
/**
 *
 * @param searchForm
 * @returns {{keyList:[],total}}
 */
function getKeyList(searchForm) {
    return $.get('/f/api/records', searchForm).then((data)=> {
        return {
            keyList: data.rows.map(format),
            total: data.total
        }
    })
}
/**
 *
 * @param {string} licenseKey
 */
function getKey(licenseKey) {
    return $.get('/f/api/records/' + licenseKey).then(format)
}
/**
 *
 * @param {Object} key
 */
function updateKey(key) {
    return $.post('/f/api/records/' + key.licenseKey, key)
}
module.exports = {
    format,
    getKeyList,
    getKey,
    updateKey
}