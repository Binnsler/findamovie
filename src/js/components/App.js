var React = require('react');
var AppActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');
var SearchForm = require('./SearchForm.js');
var MovieResults = require('./MovieResults.js');



function getAppState(){
  return {
    movies: AppStore.getMovieResults()
  }
}

var App = React.createClass({

  getInitialState: function(){
    return getAppState();
  },

  _onChange: function(){
    this.setState(getAppState());
  },

  componentDidMount: function(){
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    if(this.state.movies == ''){
      var movieResults = '';
    }
    else{
      var movieResults = <MovieResults movies={this.state.movies}/>
    }
    return(
      <div>
        <SearchForm/>
        {movieResults}
      </div>
    );
  }
});

module.exports = App
