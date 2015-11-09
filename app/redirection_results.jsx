import React from 'react'

class RedirectionResults extends React.Component {
  renderError(i, datum) {
    return (
      <div className="col-sm-12" key={i}>
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h3 className="panel-title">Error</h3>
          </div>
          <div className="panel-body">
            Unrolling "{datum.uri}" failed with error: {datum.error_description}
          </div>
        </div>
      </div>
    )
  }

  renderSuccess(i, datum) {
    var redirectPathItems

    if (datum.redirect_path) {
      redirectPathItems = datum.redirect_path.map((e) => {
        return (
          <li key={e}>{e}</li>
        )
      })
    } else {
      redirectPathItems = []
    }

    return (
      <div className="col-sm-12" key={i}>
        <ol className="breadcrumb">
          {redirectPathItems}
          <li>{datum.unrolled_uri}</li>
        </ol>
      </div>
    )
  }

  render() {
    var rows = [],
        datum

    for (var i = this.props.data.length - 1; i >= 0; i--) {
      datum = this.props.data[i]

      if (datum.error == true) {
        rows.push(this.renderError(i, datum))
      } else {
        rows.push(this.renderSuccess(i, datum))
      }
    };

    return (<div className="row">
      {rows}
    </div>)
  }
}

module.exports = RedirectionResults
