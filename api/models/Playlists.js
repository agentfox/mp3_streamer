/**
 * Playlists.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name : 'string',
    playlist_owner : {
      model : 'users'
    },
    songs : {   // song belongto this list
      model : 'songs'
    }
  },

};

