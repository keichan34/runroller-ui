import React from 'react'
import classNames from 'classnames'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: ""
    }
  }

  handleChange(event) {
    this.setState({
      url: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.sendRequest(this.state.url)
    this.setState({url: ""})
  }

  sendRequest(url) {
    var that = this
    var request = new XMLHttpRequest();
    request.open('GET', 'https://unroll.kbys.me/unroll?uri=' + encodeURIComponent(url), true);

    request.onload = function() {
      var data = JSON.parse(request.responseText);
      if (request.status >= 200 && request.status < 400) {
        // Success!
        that.props.onSuccess(data)
      } else {
        // We reached our target server, but it returned an error
        that.props.onError(data)
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      alert("We were not able to connect to the server.")
    };

    request.send();
  }

  render() {
    var formGroupClasses = classNames({
      "form-group": true,
      "has-error": false
    })
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className={formGroupClasses}>
          <input
            type="url"
            className="form-control"
            placeholder="http://www.example.com/"
            value={this.state.url}
            onChange={this.handleChange.bind(this)} />
        </div>
      </form>
    )
  }
}

module.exports = Form
