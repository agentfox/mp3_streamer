/**
 * Songs.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name : {
      type : 'string',
      required: true,
      unique: false,
    },
    url : {
      type : 'string',
      required: false,
      unique : true
    },
    uploader : { 
      model : 'users'
    },
    comments : {
      collection : 'comments',
      via : 'song'
    },
    plays : {
      type : 'number', 
    },
    usersLiked : {
      collection : 'users',
      via : 'songsliked'
    },
    lyric : {
      type : 'string'
    },
    genres : {
      collection : 'genres',
      via : 'songs'
    },
    album : {
      model : 'albums'
    },
    singers : {
      collection : 'singers',
      via : 'songs'
    }

  },

};

