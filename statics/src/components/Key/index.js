var React = require('react')
var Panel = require('react-bootstrap/lib/Panel')
var Table = require('react-bootstrap/lib/Table')
var $ = require('jquery')
var Key = React.createClass({
    getInitialState() {
        return {}
    },

    componentDidMount() {
        $.get('/f/api/records').then((data)=> {
            this.setState({
                keyList: data.rows,
                total: data.total
            })
        })
    },

    render() {
        //var meta = [{licenseKey: {name: 'key'}}, {userId: {name: '用户id'}}]
        var trList = []
        if (this.state.keyList) {
            trList = this.state.keyList.map((item, index)=> {
                return (
                    <tr key={index}>
                        <td>{item.licenseKey}</td>
                        <td>{item.userId}</td>
                        <td>{item.roleName}</td>
                        <td>{item.apiType}</td>
                        <td>{item.sdkType}</td>
                        <td>{item.createTime}</td>
                        <td>{item.securityCode}</td>
                        <td>{item.keyname}</td>
                        <td>{item.keyIndustryId}</td>
                        <td>{item.userDevname}</td>
                        <td>{item.userType}</td>
                        <td>{item.userMobile}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.userWebsite}</td>
                        <td>{item.userIntro}</td>
                        <td>{item.keyLinkman}</td>
                        <td>{item.keyMobile}</td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <section>
                </section>
                <section>
                    <Panel header="key备案信息管理" bsClass="">
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>key</th>
                                <th>用户id</th>
                                <th>角色</th>
                                <th>平台</th>
                                <th>SDK类型</th>
                                <th>key注册日期</th>
                                <th>包名</th>
                                <th>key简介</th>
                                <th>行业类型</th>
                                <th>开发者姓名</th>
                                <th>开发者类型</th>
                                <th>开发者手机</th>
                                <th>开发者邮箱</th>
                                <th>开发者网站</th>
                                <th>开发者简介</th>
                                <th>key联系人</th>
                                <th>key联系人手机</th>
                            </tr>
                            </thead>
                            <tbody>
                            {trList}
                            </tbody>
                        </Table>
                    </Panel>
                </section>
            </div>
        )
    }
})
module.exports = Key