var React = require('react')
var ReactDOM = require('react-dom')
var Panel = require('react-bootstrap/lib/Panel')
var {Column, Cell} = require('fixed-data-table')
var Table = require('../Table')
var $ = require('jquery')
var KeyUpdate = require('../KeyUpdate')
var Select = require('../Select')
var DateTimeField = require('react-bootstrap-datetimepicker')
var {industryList,platFormList,sdkTypeList}=require('../../models/dict')
var Key = React.createClass({
    getInitialState() {
        return {
            keyList: [],
            searchForm: {
                page: 1,
                rows: 20,
                type: 'ilg'
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
    onChange(newValue){
        this.state.searchForm.indid = newValue
    },
    render(){
        var keyUpdate
        if (this.state.keyUpdate) {
            keyUpdate = (<KeyUpdate keyItem={this.state.keyUpdate} show={this.state.showKeyUpdate}
                                    onHide={()=>this.setState({showKeyUpdate:false})}/>)
        }
        return (
            <div>
                <section className="search-form">
                    <div>
                        <label>行业过滤条件</label>
                        <Select
                            onChange={(newValue)=>{this.state.searchForm.indid=newValue}}
                            optionsList={industryList}>
                        </Select>
                    </div>
                    <div>
                        <label>平台过滤条件</label>
                        <Select
                            onChange={(newValue)=>{this.state.searchForm.pf=newValue}}
                            optionsList={platFormList}>
                        </Select>
                    </div>
                    <div>
                        <label>模糊查询</label>
                        <input type="text" className="form-control basic"
                               onInput={(event)=>this.state.searchForm.sv=event.target.value}/>
                    </div>
                    <div className="flex align-items-center">
                        <label>注册时间</label>

                        <div className="inline-block relative">
                            <DateTimeField locale="zh-cn"
                                           inputFormat="YYYY/MM/DD HH:mm"/></div>
                        <div className="inline-block relative">
                            <DateTimeField locale="zh-cn"
                                           inputFormat="YYYY/MM/DD HH:mm"/></div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-info" onClick={()=>{this.search()}}>查询</button>
                    </div>
                </section>
                <section>
                    <Table
                        total={this.state.total}
                        page={this.state.searchForm.page}
                        pageSize={this.state.searchForm.rows}
                        toPage={this.toPage}
                        rowsCount={this.state.keyList.length}
                        rowHeight={50}
                        height={600}
                        onRowDoubleClick={this.onRowDoubleClick}
                        headerHeight={40}>
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
                                                  {platFormList.getText(this.state.keyList[props.rowIndex].apiType)}
                                               </Cell>
                                          )}
                            width={200}
                            >
                        </Column>
                        <Column
                            header={<Cell>SDK类型</Cell>}
                            cell={props => (
                                             <Cell {...props}>
                                                  {sdkTypeList.getText(this.state.keyList[props.rowIndex].sdkType)}
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
                                                  {industryList.getText(this.state.keyList[props.rowIndex].keyIndustryId)}
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
                </section>
                {keyUpdate}
            </div>
        )
    }
})
module.exports = Key