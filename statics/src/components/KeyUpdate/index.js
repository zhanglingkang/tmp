var React = require('react')
var Modal = require('react-bootstrap/lib/Modal')
var LinkedStateMixin = require('react-addons-linked-state-mixin')
var Select = require('../Select')
var moment = require('moment')
var {industryList,platFormList,sdkTypeList,userTypeList}=require('../../models/dict')
var keyService = require('../../models/keyService')
var constant = require('../../models/constant')
var KeyUpdate = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState() {
        var state = {
            show: this.props.show
        }
        return state
    },

    componentDidMount() {
        if (this.props.licenseKey) {
            keyService.getKey(this.props.licenseKey).then((keyItem)=> {
                this.setState(keyItem)
            })
        }
    },
    submit(event){
        event.preventDefault()
        var {show,...form}=this.state
        keyService.updateKey(form).then((data)=> {
            if (data.status == constant.SUCCESSFUL) {
                if (this.props.onUpdateSuccess) {
                    this.props.onUpdateSuccess()
                    this.close()
                }
            }
        })
    },
    close(){
        this.setState({
            show: false
        })
        if (this.props.onHide) {
            this.props.onHide()
        }
    },
    componentWillReceiveProps(props){
        //console.count('xx')
        var {keyItem,...other}=props
        this.setState(props.keyItem)
        this.setState(other)
    },

    render() {
        return ( <Modal
                bsSize="lg"
                show={this.state.show}
                onHide={this.close}
                dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">key备案信息详情</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="flex flex-wrap-wrap "
                             style={{maxHeight:'60vh',overflowY:'auto',marginBottom:'15px'}}>
                            <div className="input-container" style={{minWidth:"360px"}}>
                                <div className="form-group">
                                    <label>Key</label>
                                    <input type="input" value={this.state.licenseKey} className="form-control"
                                           readOnly/>
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label >key描述</label>
                                    <input type="input" className="form-control"
                                           valueLink={this.linkState('keyname')}
                                           readOnly/>
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label >用户id</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('userId')}
                                           readOnly/>

                                    <p className="help-block"></p>
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>角色</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('rowName')}
                                           readOnly/>

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>平台</label>
                                    <input type="text" className="form-control"
                                           value={platFormList.getText(this.state.apiType)}
                                           readOnly/>

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>SDK类型</label>
                                    <input type="text" className="form-control"
                                           value={sdkTypeList.getText(this.state.sdkType)}
                                           readOnly/>

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>key注册日期</label>
                                    <input type="text" className="form-control"
                                           value={moment.unix(this.state.createTime).format('YYYY-MM-DD HH:mm')}
                                           readOnly/>

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>包名</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('securityCode')}
                                           readOnly/>

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>行业类型</label>

                                    <div>
                                        <Select width="196px" optionsList={industryList}
                                                value={this.state.keyIndustryId}
                                                onChange={(newValue)=>{this.state.keyIndustryId=newValue}}/>
                                    </div>

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>开发者姓名</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('userDevname')}
                                    />
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>开发者类型</label>
                                    <div>
                                        <Select width="196px" optionsList={userTypeList} value={this.state.userDevname}
                                                onChange={(newValue)=>{this.state.userDevname=newValue}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>开发者手机</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('userMobile')}
                                    />

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>开发者邮箱</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('userEmail')}
                                    />

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>开发者网站</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('userWebsite')}
                                    />

                                </div>
                            </div>

                            <div className="input-container">
                                <div className="form-group">
                                    <label>key联系人</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('keyLinkman')}
                                    />

                                </div>
                            </div>
                            <div className="input-container">
                                <div className="form-group">
                                    <label>key联系人手机</label>
                                    <input type="text" className="form-control"
                                           valueLink={this.linkState('keyMobile')}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="input-container flex-100">
                                <div className="form-group">
                                    <label>开发者简介</label>
                                    <textarea className="form-control"
                                              valueLink={this.linkState('userIntro')}
                                    />

                                </div>
                            </div>
                            <div className="input-container flex-100">
                                <div className="form-group">
                                    <label>key使用场景描述</label>
                                    <textarea className="form-control"
                                              valueLink={this.linkState('keyScence')}
                                    />

                                </div>
                            </div>
                        </div>
                        <button onClick={this.submit} className="btn btn-success">提交</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        )
    }
})
module.exports = KeyUpdate