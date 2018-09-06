/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    url_avatar : {
      type : 'string',
      required: false,
      unique : true
    },
    emailAddress: {
      type: 'string',
      description: 'The email address for this user.',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      
    },
    role : {
      type: 'string',
      required: true,
    },

    password: {
      type: 'string',
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name',
      
    },
    songs : {
      collection : 'songs',
      via : 'uploader'
    },
    playlists : {
      collection : 'playlists',
      via : 'playlist_owner'
    },
    comment : {
      collection : 'comments',
      via : 'comment_owner'
    },
    likes : {
      collection : 'likes',
      via : 'user'
    }
  },

};

