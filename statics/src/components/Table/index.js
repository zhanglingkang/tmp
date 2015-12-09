var React = require('react')
var ReactDOM = require('react-dom')
var {Table, Column, Cell} = require('fixed-data-table')
var $ = require('jquery')
var SelfAdaptionTable = React.createClass({
    getInitialState() {
        return {
            width: this.props.width || 0,
            height: this.props.height || 0
        }
    },
    updateWidthAndHeight(){
        var container = ReactDOM.findDOMNode(this.refs.container)
        var state = {}
        if (!this.state.width) {
            state.width = $(container).width()
        }
        if (!this.state.height) {
            state.height = this.props.rowsCount * this.props.rowHeight
        }
        if (state.width || state.height) {
            this.setState(state)
        }
    },
    componentDidMount() {
        this.updateWidthAndHeight()

    },
    componentDidUpdate(){
        this.updateWidthAndHeight()
    },
    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
            columnWidths: {
                //...columnWidths,
                [columnKey]: newColumnWidth
            }
        }))
    },
    render() {
        var table
        if (this.state.width && this.state.height) {
            table = (
                <Table {...this.props}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    width={this.state.width}
                    height={this.state.height}
                    >
                    {this.props.children}
                </Table>
            )
        }
        return (
            <div ref="container">
                {table}
            </div>
        )
    }
})
module.exports = SelfAdaptionTable