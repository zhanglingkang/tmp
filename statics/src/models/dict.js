var industryList = [
    {text: '未分类', value: '0'},
    {text: '其他', value: '1'},
    {text: '体育', value: '2'},
    {text: '健康健美', value: '3'},
    {text: '儿童', value: '4'},
    {text: '医疗', value: '5'},
    {text: '参考', value: '6'},
    {text: '商务', value: '7'},
    {text: '商品指南', value: '8'},
    {text: '图书', value: '9'},
    {text: '天气', value: '10'},
    {text: '娱乐', value: '11'},
    {text: '导航', value: '12'},
    {text: '工具', value: '13'},
    {text: '报刊杂志', value: '14'},
    {text: '摄影与录像', value: '15'},
    {text: '效率', value: '16'},
    {text: '教育', value: '17'},
    {text: '新闻', value: '18'},
    {text: '旅游', value: '19'},
    {text: '游戏', value: '20'},
    {text: '生活', value: '21'},
    {text: '社交', value: '22'},
    {text: '美食佳饮', value: '23'},
    {text: '财务', value: '24'},
    {text: '音乐', value: '25'},
    {text: '出行', value: '26'}

]
var platFormList = [
    {text: '全平台', value: '-1'},
    {text: '未知', value: '0'},
    {text: 'REST API', value: '1'},
    {text: 'JS API', value: '2'},
    {text: '移动端SDK', value: '3'},
    {text: '安卓SDK', value: '4'},
    {text: 'IOS SDK', value: '5'},
    {text: 'windowsphoneSDK', value: '6'}
]
var sdkTypeList = [
    {text: '非SDK', value: '0'},
    {text: '安卓', value: '1'},
    {text: 'IOS', value: '2'},
    {text: 'WindowsPhone', value: '3'},
]
var userTypeList = [
    {text: '个人', value: 'developer'},
    {text: '企业', value: 'enterprise'}
]
var methods = {
    getText(value){
        return this.getOption(value).text
    },
    getOption(value){
        var result = {}
        this.some(item=> {
            if (item.value === value) {
                result = item
                return true
            }
        })
        return result
    },
    getValue(text){
        var result = ''
        this.some(item=> {
            if (item.text === text) {
                result = item.value
                return true
            }
        })
        return result
    }
}
methods.__proto__ = Array.prototype
industryList.__proto__ = methods
platFormList.__proto__ = methods
sdkTypeList.__proto__ = methods
userTypeList.__proto__ = methods
module.exports = {
    industryList,
    platFormList,
    sdkTypeList,
    userTypeList
}