import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
 
import { Clubs } from './collection';
 
function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
 
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
 
  return null;
}
 
export function invite(clubId, userId) {
  check(clubId, String);
  check(userId, String);
 
  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }
 
  const club = Clubs.findOne(clubId);
 
  if (!club) {
    throw new Meteor.Error(404, 'No such Club!');
  }
 
  if (club.owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }
 
  if (club.public) {
    throw new Meteor.Error(400, 'That Club is public. No need to invite people.');
  }
 
  if (userId !== club.owner && ! _.contains(club.invited, userId)) {
    Clubs.update(clubId, {
      $addToSet: {
        invited: userId
      }
    });
 
    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));
 
    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@socially.com',
        subject: `CLUB: ${club.title}`,
        text: `
          Hey, I just invited you to ${club.title} on Socially.
          Come check it out: ${Meteor.absoluteUrl()}
        `
      });
    }
  }
}

export function revokeInvitation(clubId, userId){
  const club = Clubs.findOne(clubId);
  if(club.owner === userId){
    throw new Meteor.Error(400, 'Club Owner cannot be removed : ' + club.owner + ' : ' + this.userId);
  }else if(club.public){
    throw new Meteor.Error(400, 'This is a public Club. No user can be removed');
  }else{
    Clubs.update(clubId, {
      $pull: {
        invited: userId
      }
    });
  }
}
 export function rsvp(clubId, rsvp) {
  check(clubId, String);
  check(rsvp, String);
 
  if (!this.userId) {
    throw new Meteor.Error(403, 'You must be logged in to RSVP');
  }
 
  if (!_.contains(['yes', 'no', 'maybe'], rsvp)) {
    throw new Meteor.Error(400, 'Invalid RSVP');
  }
 
  const club = Clubs.findOne({
    _id: clubId,
    $or: [{
      // is public
      $and: [{
        public: true
      }, {
        public: {
          $exists: true
        }
      }]
    },{
      // is owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }, {
      // is invited
      $and: [{
        invited: this.userId
      }, {
        invited: {
          $exists: true
        }
      }]
    }]
  });
 
  if (!club) {
    throw new Meteor.Error(404, 'No such club');
  }
 
  const hasUserRsvp = _.findWhere(club.rsvps, {
    user: this.userId
  });
 
  if (!hasUserRsvp) {
    // add new rsvp entry
    Clubs.update(clubId, {
      $push: {
        rsvps: {
          rsvp,
          user: this.userId
        }
      }
    });
  } else {
    // update rsvp entry
    const userId = this.userId;
    Clubs.update({
      _id: clubId,
      'rsvps.user': userId
    }, {
      $set: {
        'rsvps.$.rsvp': rsvp
      }
    });
  }
}
Meteor.methods({
  invite,
  revokeInvitation,
  rsvp
});