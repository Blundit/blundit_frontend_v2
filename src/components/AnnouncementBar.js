import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import API from './../utilities/API'
import Cache from './../utilities/Cache'
import Cookies from './../utilities/Cookies'

const mapStateToProps = (state) => {
  return {
    announcements: state.announcements
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    set_announcement_list: (ownProps) => dispatch({ 
      type: "SET_ANNOUNCEMENT_LIST",
      value: ownProps
    })
  }
}


class AnnouncementBar extends Component {
  componentDidMount () {
    this.loadAnnouncements()
  }


  loadAnnouncements () {
    const { announcements, set_announcement_list } = this.props;

    const CacheCheck = Cache.invalid(announcements, { type: 'announcement', search: null, sort: null, type: null, key: 'announcements_list', created: Date.now() })
    if (CacheCheck) {
      const params = {
        path: "announcements",
      }

      API.do(params).then((result) => {
        set_announcement_list({ type: 'announcement', search: null, sort: null, type: null, key: 'announcements_list', items: result.announcements, created: Date.now() });
      },
      (reject) => {
        console.error(reject);
        set_announcement_list({ type: 'announcement', search: null, sort: null, type: null, key: 'announcements_list', items: null, created: Date.now() });
      });
    }
  }

  
  filterAnnouncements (announcements, slug) {
    if (!announcements) { return [] }
    const filtered = announcements
      .find((element) => element.key === 'announcements_list').items

    if (!filtered) { return [] }

    return filtered
      .filter((element) => element.slug == slug)
      .filter((element) => this.notDismissed(element.announcement_key))
  }


  notDismissed = (key) => !Cookies.getCookie("announcement_"+key+"_viewed") ? true : false


  dismissAnnouncement = (key) => {
    const { set_announcement_list, announcements } = this.props

    Cookies.setCookie("announcement_"+key+"_viewed", key)
    set_announcement_list(announcements)
  }


  render() {
    const { announcements, slug } = this.props;
    const myAnnouncements = this.filterAnnouncements(announcements, slug)
    if (!myAnnouncements || myAnnouncements.length === 0) { 
      return <div></div>
    }


    return <div className="announcements--wrapper">
      {myAnnouncements.map((item) => {
        return <div className="announcements__item" key={`announcement_${item.announcement_key}`}>
          <div className="announcements__item-meta">
            <div className="announcements__item-meta__title">{item.title}</div>
            {item.dismissable && 
              <div className="announcements__item-meta__close" onClick={this.dismissAnnouncement.bind(this, item.announcement_key)}>
                <span className="fas fa-times" />
              </div>
            }
          </div>
          <div className="announcements__item-content">
            {item.announcement}
          </div>
          {item.link &&
            <div className="announcements__item-bottom">
              <a href={item.link}>{item.link_text}</a>
            </div>
          }
        </div>
      })
      }  
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementBar);