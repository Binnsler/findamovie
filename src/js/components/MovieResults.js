var React = require('react');
var AppActions = require('../actions/AppActions.js');
var Movie = require('./Movie.js');

var MovieResults = React.createClass({

  render: function(){
    return(
      <div className="">
        <h3 className="text-center">Results</h3>
        {
          this.props.movies.map(function(movie, i){
            return(
              <Movie movie={movie} key={i} />
            )
          })
        }
      </div>
    );
  }
});

module.exports = MovieResults;
