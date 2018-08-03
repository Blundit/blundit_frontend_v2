import React, { Component } from 'react'
import Card from './Card'

class VoteForItem extends Component {
  constructor(props) {
    super()

    this.state = {
      userVoted: false,
      userVote: this.props.obj.user_vote
    }
  }

  voteTrue = () => this.submitVote("true")


  voteFalse = () => this.submitVote("false")


  voteUnknown = () => this.submitVote("unknown")


  voteUnknowable = () => this.submitVote("unknowable")

  
  submitVote = (val) => {
    this.setState({ userVoted: false })

    const api_params = {
      path: (this.type === "claim" ? "vote_for_claim" : "vote_for_prediction"),
      path_variables: {
        id: this.props.id
      },
      data: {
        value: val
      }
    }

    API.do(api_params).then((result) => {
      this.setState({ 
        userVoted: true,
        userVote: val
      })

    },
    (reject) => {
      console.error(reject);
    });
  }


  render() {
    const { type, obj } = this.props
    const icon = <span className="fas fa-pen-square" />
    return <Card title="vote" icon={icon}>
      <div className={`${type}-vote`}>
        {obj.open !== true && 
          <p>This isn't open for voting, which means your choice won't affect the rating of the {this.props.type} on the site: but you can record what you think, which is also cool.</p>
        }
        {this.state.userVote === null &&
          <p>Vote! (info here about what the voting state is)</p>
        }
        { this.state.userVote !== null &&
          <p>You've already voted {this.state.userVote}, but you can change your mind!</p>
        }
        {this.state.userVoted === true &&
          <p>Thanks for voting!</p>
        }
        
        <div className={`${type}-vote__options`}>
          <span onClick={this.voteTrue} className="far fa-thumbs-up" title={`Select this if you think this ${this.type} is true.`}></span>
          <span onClick={this.voteFalse} className="far fa-thumbs-down" title={`Select this if you think this ${this.type} is false.`}></span>
          <span onClick={this.voteUnknown} className="far fa-question-circle" title={`Select this if you think the truth of this ${this.type} is unknown.`}></span>
          <span onClick={this.voteUnknowable} className="far fa-exclamation-triangle" title={`Select this if you think the truth of this ${this.type} is unknowable.`}></span>
        </div>

        <VoteTally tally={obj.vote_tally} />
      </div>
    </Card>
  }
}

export default VoteForItem