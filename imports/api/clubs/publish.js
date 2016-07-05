import { Meteor } from 'meteor/meteor';
 
import { Clubs } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('clubs', function() {
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
      }]
    };
 
    return Clubs.find(selector);
  });
}