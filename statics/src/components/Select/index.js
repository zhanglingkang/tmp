require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var Select = React.createClass({
        getInitialState() {
            return {
                open: '',
                option: {}
            }
        },
        componentDidMount() {

        },
        listenOutsideClick(event){
            console.log('click')
            if (!$.contains(this.refs.root, event.target)) {
                this.setState({
                    open: ''
                })
            }
        },
        componentDidUpdate(){
        },
        selectOption(option){
            this.setState({
                option: option,
                open: ''
            })
        },
        filter(event){
            this.setState({
                filterValue: event.target.value
            })
        },
        getFilteredList(){
            return this.props.optionsList.filter((option)=> {
                return option.text.indexOf(this.state.filterValue) !== -1
            })
        },
        render() {
            if (this.state.open) {
                $(document).on('click', this.listenOutsideClick)
            } else {
                setTimeout(()=> {
                        this.setState({
                            filterValue: ''
                        })
                    }
                )
                $(document).off('click', this.listenOutsideClick)
            }
            var filteredList = this.getFilteredList()
            var liList = (
                <li >
                    <a>无匹配项</a>
                </li>
            )
            if (filteredList && filteredList.length > 0) {
                liList = filteredList.map((option, index)=> {
                    return (
                        <li className={this.state.option===option?'active':''}
                            key={index}
                            onClick={()=>this.selectOption(option)}>
                            <a>{option.text}</a>
                        </li>
                    )
                })
            }
            return (
                <div ref="root" className="select">
                    <div className={`dropdown flex flex-column ${this.state.open}`}
                        >
                        <button
                            className="btn btn-default dropdown-toggle align-items-center flex flex-center justify-content-between"
                            type="button"
                            style={{minHeight:'36px'}}
                            onClick={()=>this.setState({open:'open'})}
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="true">
                            <span style={{display:'inline-block'}}>
                                {this.state.option.text || '请选择'}
                            </span>
                            <span className="caret"></span>
                        </button>
                        <div className="dropdown-menu-container">
                            <div className="input-group">
                                <input type="text" value={this.state.filterValue} onChange={this.filter}
                                       className="form-control"
                                       placeholder="Search for..."></input>
                            </div>
                            <ul className="dropdown-menu" style={{right:'0'}}>
                                {
                                    liList
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    }
)
module.exports = Select