var React = require('react')
var ReactDOM = require('react-dom')
var Panel = require('react-bootstrap/lib/Panel')
var {Column, Cell} = require('fixed-data-table')
var Table = require('../Table')
var $ = require('jquery')
var KeyUpdate = require('../KeyUpdate')
var Select = require('../Select')
var {DateTimeInput} = require('amazeui-react')
var Key = React.createClass({
    getInitialState() {
        return {
            keyList: [],
            searchForm: {
                page: 1,
                rows: 20
            }
        }

    },

    componentDidMount() {
        this.search()

    },
    onRowDoubleClick(event, rowIndex){
        this.setState({
            keyUpdate: this.state.keyList[rowIndex],
            showKeyUpdate: true
        })
    },
    search(searchForm){
        searchForm = searchForm || this.state.searchForm
        $.get('/f/api/records', searchForm).then((data)=> {
            this.setState({
                keyList: data.rows,
                total: data.total,
                totalPage: (data.total + searchForm.rows - 1) / searchForm.rows
            })
        })
    },
    toPage(page){
        var {...searchForm}=this.state.searchForm
        searchForm.page = page
        this.setState({
            searchForm: searchForm
        })
        this.search(searchForm)
    },
    getPageLiList(){
        var page = parseInt(this.state.searchForm.page)
        var totalPage = parseInt(this.state.totalPage)
        var pageList = []
        if (!totalPage || totalPage < 1) {
            return
        }

        function pushPage(page) {
            if (pageList.indexOf(page) === -1) {
                var lastPage = pageList[pageList.length - 1]
                if (!$.isNumeric(lastPage) || !$.isNumeric(page) || page > lastPage) {
                    pageList.push(page)
                }
            }
        }

        if (totalPage >= 1) {
            pushPage(1)
        }
        if (totalPage >= 2) {
            pushPage(2)
        }
        if (page <= 5) {
            for (let i = 1; i <= 5 && i <= totalPage; i++) {
                pushPage(i)
            }
        }
        if (pageList[pageList.length - 1] + 1 < page - 2) {
            pushPage('first...')
        }
        if (page + 5 > totalPage) {
            for (let i = totalPage - 5 > 0 ? totalPage - 5 : 1; i <= totalPage; ++i) {
                pushPage(i)
            }
        }
        if (page - 2 > 0) {
            pushPage(page - 2)
        }
        if (page - 1 > 0) {
            pushPage(page - 1)
        }
        if (page > 0) {
            pushPage(page)
        }
        if (page + 1 <= totalPage) {
            pushPage(page + 1)
        }
        if (page + 2 <= totalPage) {
            pushPage(page + 2)
        }
        if (page + 2 + 1 < totalPage - 1) {
            pushPage('second...')
        }
        //if (page + 5 > totalPage) {
        //    for (let i = totalPage - 5 > 0 ? totalPage - 5 : 1; i <= totalPage; ++i) {
        //        pushPage(i)
        //    }
        //}
        if (totalPage - 1 > 0) {
            pushPage(totalPage - 1)
        }
        if (totalPage > 0) {
            pushPage(totalPage)
        }
        var liList = []
        liList.push(
            <li key={Math.random()} className={page===1?'disabled':''}>
                <a aria-label="Previous" onClick={()=>this.toPage(page-1)}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        )
        pageList.forEach((pageNum, index)=> {
            if (/first|second/.test(pageNum)) {
                liList.push(
                    <li key={index}>
                        <a>...</a>
                    </li>
                )
            } else {
                liList.push(
                    <li key={index} className={page === pageNum ? 'active' : ''}>
                        <a onClick={()=>this.toPage(pageNum)}>{pageNum}</a>
                    </li>
                )
            }
        })
        liList.push(
            <li key={Math.random()} className={page===totalPage?'disabled':''}>
                <a aria-label="Next" onClick={()=>this.toPage(page+1)}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        )
        return liList
    },
    render(){
        var keyUpdate
        if (this.state.keyUpdate) {
            keyUpdate = (<KeyUpdate keyItem={this.state.keyUpdate} show={this.state.showKeyUpdate}
                                    onHide={()=>this.setState({showKeyUpdate:false})}/>)
        }
        var industryList = [{text: '未分类', value: '0'}, {text: '其他', value: '1'}]
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
        return (
            <div>
                <section className="search-form">
                    <div>
                        <label>行业过滤条件</label><Select optionsList={industryList}></Select>
                    </div>
                    <div>
                        <label>平台过滤条件</label><Select optionsList={platFormList}></Select>
                    </div>
                    <div>
                        <label>模糊查询</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div>
                        <label>时间</label>

                        <div className="inline-block"><DateTimeInput amStyle="warning"/></div>
                    </div>
                </section>
                <section>
                    {/*<Panel header="key备案信息管理">*/}
                    <Table
                        rowsCount={this.state.keyList.length}
                        rowHeight={50}
                        height={600}
                        onRowDoubleClick={this.onRowDoubleClick}
                        headerHeight={50}>
                        <Column
                            header={<Cell>key</Cell>}
                            fixed={true}
                            //isResizable={true}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].licenseKey}
                                               </Cell>
                                          )}
                            width={280}
                            >
                        </Column>
                        <Column
                            header={<Cell>用户id</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].userId}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>角色</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].rowName}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>平台</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].apiType}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>SDK类型</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].sdkType}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>key注册日期</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].createTime}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>包名</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].securityCode}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>key简介</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].keyname}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>行业类型</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].keyIndustryId}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>开发者姓名</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].userDevname}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>开发者类型</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].userType}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>开发者手机</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].userMobile}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>开发者邮箱</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].userEmail}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>开发者网站</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].userWebsite}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>开发者简介</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].userIntro}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>key联系人</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].keyLinkman}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>key联系人手机</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {this.state.keyList[props.rowIndex].keyMobile}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                    </Table>
                    {/*</Panel>*/}
                </section>
                <section className="flex flex-row-reverse" style={{padding:"0 15px"}}>
                    <nav>
                        <ul className="pagination">
                            {this.getPageLiList()}
                        </ul>
                    </nav>
                    <div className="flex align-items-center" style={{marginRight:"15px"}}>总共
                        <span style={{fontStyle:"italic",margin:"0 5px"}}>{this.state.total}</span>条记录
                    </div>
                </section>
                {keyUpdate}
            </div>
        )
    }
})
module.exports = Key