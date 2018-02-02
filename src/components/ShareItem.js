import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'

class ShareItem extends Component {
  // TODO: Abstract this to some Utils class
  shareToFacebook () {
    window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href), "_blank")
  }


  shareToPinterest = () => {
    const desc = ( this.props.object.title ? this.props.object.title : this.props.object.name )
    window.open("https://pinterest.com/pin/create/button/?url="+encodeURIComponent(window.location.href)+"&desciption="+desc, "_blank")
  }


  shareToTwitter = () => {
    const desc = ( this.props.object.title ? this.props.object.title : this.props.object.name )
    window.open("http://www.twitter.com/share?url="+encodeURIComponent(window.location.href)+"&text="+encodeURIComponent("Check out this great look at how accurate '"+desc+"' really is!"), "_blank")
  }


  shareToGooglePlus() {
    window.open("https://plus.google.com/share?url="+encodeURIComponent(window.location.href), "_blank")
  }


  shareToLinkedIn = () => {
    const desc = ( this.props.object.title ? this.props.object.title : this.props.object.name )
    window.open("https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(window.location.href)+"&title="+desc+"&summary=&source=", "_blank")
  }


  render() {
    const { type, object } = this.props
    const icon = <span className="fas fa-bullhorn" />

    return <Card title="share" icon={icon}>
      <div className="share-cluster">
        <span onClick={this.shareToFacebook} >
          <span className="icon--facebook fab fa-facebook" />
        </span>
        <span onClick={this.shareToTwitter} >
          <span className="icon--twitter fab fa-twitter" />
        </span>
        <span onClick={this.shareToPinterest} >
          <span className="icon--pinterest fab fa-pinterest" />
        </span>
        <span onClick={this.shareToLinkedIn} >
          <span className="icon--linkedin fab fa-linkedin" />
        </span>
        <span onClick={this.shareToGooglePlus} >
          <span className="icon--google-plus fab fa-google-plus-g" />
        </span>
      </div>
    </Card>
  }
}

export default ShareItem