/**
 * Singers.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name : {
      type : 'string',

    },
    description : {
      type : 'string'
    },
    albums : {
      type : 'array',
      collection : 'albums',
      via : 'singer'
    },
    url_img : {
      type : 'string'
    },
    songs : {
      type : 'array',
      collection : 'songs',
      via : 'singers'
    }

  },

};

