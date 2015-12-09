var React = require('react')
var ReactDOM = require('react-dom')
var Panel = require('react-bootstrap/lib/Panel')
var {Column, Cell} = require('fixed-data-table')
var Table = require('../Table')
var $ = require('jquery')
var KeyUpdate = require('../KeyUpdate')
var Key = React.createClass({
    getInitialState() {
        return {
            keyList: []
        }

    },

    componentDidMount() {
        $.get('/f/api/records').then((data)=> {
            this.setState({
                keyList: data.rows,
                total: data.total
            })
        })
    },
    onRowDoubleClick(event, rowIndex){
        this.setState({
            keyUpdate: this.state.keyList[rowIndex]
        })
    },

    render(){
        var keyUpdate
        if (this.state.keyUpdate) {
            keyUpdate = (<KeyUpdate keyItem={this.state.keyUpdate} show={true}/>)
        }
        return (
            <div>
                <section>
                </section>
                <section>
                    <Panel header="key备案信息管理">
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
                    </Panel>
                </section>
                <section>
                    <nav>
                        <ul className="pagination">
                            <li>
                                <a href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                                <a href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
                {keyUpdate}
            </div>
        )
    }
})
module.exports = Key