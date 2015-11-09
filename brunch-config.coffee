exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo: 'app.js'
    stylesheets:
      joinTo: 'app.css'
      order:
        before: [
          'bootstrap.css'
        ]
    templates:
      joinTo: 'app.js'

  modules:
    autoRequire:
      'app.js': ['app']

  plugins:
    babel:
      pattern: /\.(es6|jsx)$/

  npm:
    enabled: true
