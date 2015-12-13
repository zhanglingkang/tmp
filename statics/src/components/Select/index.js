require('./style.scss')
var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var Select = React.createClass({
        getInitialState() {
            var option = {}
            if (this.props.value) {
                option = this.props.optionsList.getOption(this.props.value)
            }
            return {
                open: '',
                option

            }
        },
        componentWillReceiveProps(props){
            if (props.value) {
                this.setState({
                    option: this.props.optionsList.getOption(props.value)
                })
            }
        },
        componentDidMount()
        {

        },
        listenOutsideClick(event)
        {
            if (!$.contains(this.refs.root, event.target)) {
                this.setState({
                    open: ''
                })
            }
        },
        componentDidUpdate()
        {
        },
        changeOption(option)
        {
            if (this.state.option !== option) {
                this.setState({
                    option: option
                })
                if (this.props.onChange) {
                    this.props.onChange(option.value, this.state.option.value)
                }
            }
        },
        selectOption(option)
        {
            this.changeOption(option)
            this.setState({
                open: ''
            })
        },
        filter(event)
        {
            this.setState({
                filterValue: event.target.value
            })
        },
        getFilteredList()
        {
            if (!this.state.filterValue) {
                return this.props.optionsList
            }
            var escape = this.state.filterValue.replace(/(\\|\.|\+|\?|\*|\[|\$|\^)/g, '\\$1')
            try {
                var reg = new RegExp(escape, 'i')
            } catch (e) {
                console.log('reg Error:', e)
                return this.props.optionsList
            }
            return this.props.optionsList.filter((option)=> {
                return reg.test(option.text)

            })
        },
        onKeyDown(event)
        {
            if (!this.state.open) {
                return
            }
            var position = this.state.position
            var filteredList = this.getFilteredList()
            if (!filteredList || filteredList.length === 0) {
                return
            }
            if (event.key === 'ArrowDown') {
                if (!$.isNumeric(position)) {
                    position = -1
                }
                position = (position + 1) % filteredList.length
                this.changeOption(filteredList[position])
                event.preventDefault()
                this.refs['liNode' + position].scrollIntoView()
            } else if (event.key === 'ArrowUp') {
                if (!$.isNumeric(position)) {
                    position = 0
                }
                position = (position - 1 + filteredList.length) % filteredList.length
                this.changeOption(filteredList[position])
                event.preventDefault()
                this.refs['liNode' + position].scrollIntoView()
            } else if (event.key === 'Enter') {
                this.setState({
                    open: ''
                })
                event.preventDefault()
            }
            this.setState({
                position
            })
        },
        render()
        {
            if (this.state.open) {
                $(document).on('click', this.listenOutsideClick)
                setTimeout(()=> {
                    this.refs.input.focus()
                })
            } else {
                setTimeout(()=> {
                        this.setState({
                            filterValue: '',
                            position: ''
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
                        <li ref={'liNode'+index} className={this.state.option===option?'active':''}
                            key={index}
                            onClick={()=>this.selectOption(option)}>
                            <a>{option.text}</a>
                        </li>
                    )
                })
            }
            var input
            if (this.props.optionsList.length > 6) {
                input = (
                    <div className="input-group">
                        <input ref="input" type="text" value={this.state.filterValue} onInput={this.filter}
                               className="form-control"
                               placeholder="Search for..."></input>
                    </div>
                )
            }
            var style = {}
            if (this.props.width) {
                style.width = this.props.width
            }
            return (
                <div ref="root" className="select" style={style}>
                    <div className={`dropdown flex flex-column ${this.state.open}`}
                         onKeyDown={this.onKeyDown}>
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
                            {input}
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