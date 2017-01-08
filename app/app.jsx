var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import Main from 'Main'

// Load custom css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
