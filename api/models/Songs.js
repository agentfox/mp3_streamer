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
      type : 'array',
      collection : 'comments',
      via : 'song'
    },
    plays : {
      type : 'number', 
    },
    likes : {
      type : 'number',
      collection : 'likes',
      via : 'song'
    },
    lyric : {
      type : 'string'
    },
    genres : {
      type : 'array',
      collection : 'genres',
      via : 'songs'
    },
    album : {
      model : 'albums'
    },
    playlists : {
      type : 'array',
      collection : 'playlists',
      via : 'songs'
    },
    singers : {
      type : 'array',
      collection : 'singers',
      via : 'songs'
    }

  },

};

