import { Meteor } from 'meteor/meteor';
 
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Clubs } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('clubs', function(options, searchString) {
    const selector = {
      $or: [{
        // the public clubs
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is one of invited
        $and: [{
          invited: this.userId
        }, {
          invited: {
            $exists: true
          }
        }]
      }]
    };
    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }
    Counts.publish(this, 'numberOfClubs', Clubs.find(selector), {
      noReady: true
    });

    return Clubs.find(selector, options);
  });
}