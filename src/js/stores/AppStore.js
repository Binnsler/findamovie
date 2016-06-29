var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appApi.js');

var CHANGE_EVENT = 'change';

var _movies = [];
var _selected = '';

var AppStore = assign({}, EventEmitter.prototype, {

  setMovieResults:function(movies){
    _movies = movies;
  },

  getMovieResults(){
    return _movies;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;

  switch(action.actionType){

    case AppConstants.SEARCH_MOVIES:
      AppAPI.searchMovies(action.movie);
      console.log('Searching for movie: ' + action.movie.title);
      AppStore.emitChange();
      break;

    case AppConstants.RECEIVE_MOVIE_RESULTS:

      AppStore.setMovieResults(action.movies);
      AppStore.emitChange();
      break;
  }

  return true;
});

module.exports = AppStore;
