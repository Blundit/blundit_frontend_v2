import React, { Component } from 'react'

class VoteTally extends Component {
    render() {
        const { tally } = this.props
        return <div className="vote-tally">
            <div><span className="far fa-thumbs-up"></span>: {tally[0].value}</div>
            <div><span className="far fa-thumbs-down"></span>: {tally[1].value}</div>
            <div><span className="far fa-question-circle" ></span>: {tally[2].value}</div>
            <div><span className="far fa-exclamation-triangle"></span>: {tally[3].value}</div>
        </div>
    }
}

export default VoteTally