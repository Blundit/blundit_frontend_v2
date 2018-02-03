import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, TextArea } from 'react-form';

import Card from './Card'
import ItemComment from './ItemComment'

import API from './../utilities/API'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  }
}


const errorValidator = (values) => { 
  return {
    content: !values.content || values.content.trim() === '' ? 'Please enter a comment' : null
  };
};


class ItemComments extends Component {
  constructor() {
    super()

    this.state = {
      page: 1,
      comments: [],
      commentError: false
    }
  }


  // TODO: Add paging, possibly hook this up to redux?
  componentDidMount() {
    this.loadComments()
  }
  
  loadComments() {
    const { type, id } = this.props
    // TODO: Make sure paging data is properly set with comment loading
    const params = {
      path: `${type}_comments`,
      path_variables: {
        claim_id: id,
        expert_id: id,
        prediction_id: id
      },
    }

    API.do(params).then((result) => {
      this.setState({
        comments: result.comments,
        page: result.page,
        number_of_pages: result.number_of_pages
      })
    },
    (reject) => {
      console.error(reject);
    });
  }


  submitForm = (value) => {
    const { id, type } = this.props

    this.setState({ commentError: false })
    let params = {
      path: `${type}_add_comment`,
      path_variables: {
        claim_id: id,
        prediction_id: id,
        expert_id: id,
      },
      data: { content: value.content },
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (!result) {
        this.setState({ commentError: true })
      } else if (result.error === true) {
        this.setState({ commentError: true })
      } else {
        this.loadComments()
      }
    }, 
    (reject) => {
      console.error("problem adding comment");
      this.setState({ commentError: true })
    })
  }

  commentForm() {
    return <Form
      onSubmit={submittedValues => this.submitForm(submittedValues) }
      validateError={errorValidator}
      validateOnSubmit={"yes"}
      dontValidateOnMount={"yes"}>
      { formApi => (
        <form onSubmit={formApi.submitForm} id="form2">
          <div>
            <TextArea field="content" id="content" placeholder="Add Comment" />
            <br/>
            {formApi.errors.content && <span className="error">{formApi.errors.content}</span>}
          </div>

          <button type="submit">Submit</button>
          {this.state.commentError &&
            <span className="error">Unable to post comment: please try again later.</span>
          }
        </form>
      )}
    </Form>
  }


  render() {
    const { type, id, user } = this.props
    const { comments } = this.state
    const icon = <span className="fas fa-comment" />

    return <Card title={`comments (${comments.length})`} icon={icon} >
      <div className={`${type}-comments`}>
        {comments.length == 0 &&
          <div className={`${type}-comments--no-comments`}>
            This {type} has no comments.
          </div>
        }
        {comments.map((item, index) => {
          return <ItemComment comment={item} key={`${type}-comment-${index}`} />
        })}
        <div className={`${type}-comments__add-comment`}>
          {!user &&
            <div className={`${type}-comments__add-comment--not-logged-in`}>
              You must be logged in to comment.
            </div>            
          }
          {user && 
            this.commentForm()
          }
        </div>
      </div>
    </Card>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemComments);