import React from 'react'
import Form from 'form'
import RedirectionResults from 'redirection_results'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataOrder: [],
      data: {}
    }
  }

  handleIncomingData(kind, data) {
    var updateHash = {}

    if (this.state.dataOrder.indexOf(data.guid) === -1) {
      updateHash["dataOrder"] = {$push: [data.guid]}
    }

    updateHash["data"] = {}
    updateHash["data"][data.guid] = {$set: data}

    this.setState(React.addons.update(this.state, updateHash))
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <div className="jumbotron">
              <h1>Unroll a link.</h1>
              <p>
                Enter the URL below, then hit return (or enter). The monkeys
                behind the scenes will follow all the redirects (if any), and
                will give you the final URL.
              </p>
              <Form
                onSuccess={this.handleIncomingData.bind(this, 'success')}
                onError={this.handleIncomingData.bind(this, 'error')}
                onStart={this.handleIncomingData.bind(this, 'start')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <RedirectionResults
              data={this.state.data}
              dataOrder={this.state.dataOrder} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p className="text-center">
              Want to learn more? Check out my <a href="https://kkob.us/2015/09/23/link-unroller-service/">blog post</a> about the service itself, or <a href="https://kkob.us/contact/">contact me directly</a>.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

React.render(
  <App />,
  document.getElementById("body"))
