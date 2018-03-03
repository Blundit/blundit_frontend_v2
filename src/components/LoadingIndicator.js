import React, { Component } from 'react'

class LoadingIndicator extends Component {
  render() {
    return <div className="loading-indicator">
      <span className="fas fa-spinner rotating" />
    </div>
  }
}

export default LoadingIndicator