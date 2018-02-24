import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from './../utilities/API'

import Card from './Card'


class ShareItem extends Component {
  constructor() {
    super()

    this.state = {
      embed: null,
      embed_host: null,
      loadedEmbed: false,
      embedError: false,
      embedStatusText: "Copy this code into your website."
    }
  }

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


  createEmbed = () => {
    this.setState({
      embedError: false, 
      loadedEmbed: false 
    })

    let params = {
      path: "add_" + this.props.type + "_embed",
      path_variables: {
        item_id: this.props.object.id,
      },
      data: {
        id: this.props.object.id
      }
    }

    API.do(params).then((result) => {
      // TODO: Differentiate login errors
      if (result.error === true) {
        this.setState({ 
          loadedEmbed: false, 
          embedError: true 
        })
      } else {
        this.setState({ 
          embed: result.embed,
          embed_host: result.host,
          embedError: false,
          loadedEmbed: true
        })
      }
    }, 
    (reject) => {
      this.setState({ 
        loadedEmbed: false, 
        embedError: true 
      })
    })
  }


  embedText = () => {
    const { type } = this.props
    const { embed, embed_host } = this.state
    let embed_width, embed_height

    if (type == 'claim') {
      embed_width = 302;
      embed_height = 245;
    } else if (type == 'prediction' ) {
      embed_width = 302;
      embed_height = 245;
    } else if (type == 'expert') {
      embed_width = 302;
      embed_height = 363;
    }

    return `<iframe frameborder="0" framepadding="0" src="${embed_host}${embed.embed_key}" width="${embed_width}" height="${embed_height}"></iframe>`
  }


  selectAll = () => {
    const shareText = document.getElementById("item_share_text")
    shareText.select()
  }


  copyText = () => {
    const shareText = document.getElementById("item_share_text")
    shareText.select()

    document.execCommand('Copy')

    this.setState({embedStatusText: "Copied to Clipboard!"})
  }


  render() {
    const { type, object } = this.props
    const { embed, embedError, loadedEmbed, embedStatusText } = this.state

    const icon = <span className="fas fa-bullhorn" />

    return <Card title="share" icon={icon}>
      <div className="share__links">
        <div className="share__links-title">
          <span className="fas fa-link"></span>
        </div>
        <div className="share__links-links">
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
      </div>
      <div className="share__embed">
        <div className="share__embed-title">
          <span className="fas fa-code"/>
        </div>
        <div className="share__embed-content">
          {loadedEmbed &&
            <React.Fragment>
              <div className="share__embed-content__wrapper">
                <input type="text" readOnly={true} onClick={this.selectAll} id="item_share_text" className="share__embed-content__textarea" value={this.embedText()} />
                <div 
                  className="share__embed-content__copy"
                  onClick={this.copyText}
                >
                  <span className="far fa-clipboard" />
                </div>
              </div>
              <div className="share__embed-content__status-text">{embedStatusText}</div>
            </React.Fragment>
          }
          {!loadedEmbed &&
            <div className="share__embed-content__link" onClick={this.createEmbed}>Click to embed</div>
          }

          {embedError && 
            <div>There was an error creating your embed. Please try again.</div>
          }

        </div>
      </div>
    </Card>
  }
}

export default ShareItem