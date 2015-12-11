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
    isNeedPage(){

        return this.props.page && this.props.total && this.props.pageSize
    },
    toPage(page){
        if (this.props.toPage) {
            this.props.toPage(page)
        }
    },
    getPageLiList(){
        var {page,pageSize,total}=this.props
        var totalPage = parseInt((total + pageSize - 1) / pageSize)
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
        var pageSection
        if (this.isNeedPage()) {
            pageSection = (
                <section className="flex flex-row-reverse" style={{padding:"0 15px"}}>
                    <nav>
                        <ul className="pagination">
                            {this.getPageLiList()}
                        </ul>
                    </nav>
                    <div className="flex align-items-center" style={{marginRight:"15px"}}>总共
                        <span style={{fontStyle:"italic",margin:"0 5px"}}>{this.props.total}</span>条记录
                    </div>
                </section>
            )
        }
        return (
            <div ref="container">
                {table}
                {pageSection}
            </div>
        )
    }
})
module.exports = SelfAdaptionTable