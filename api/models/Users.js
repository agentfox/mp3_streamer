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
      example: 'carol.reyna@microsoft.com'
    },

    password: {
      type: 'string',
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name',
      maxLength: 120,
      example: 'Lisa Microwave van der Jenny'
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
