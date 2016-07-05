import { Mongo } from 'meteor/mongo';
 
export const Clubs = new Mongo.Collection('clubs');
 
Clubs.allow({
  insert(userId, club) {
    return userId && club.owner === userId;
  },
  update(userId, club, fields, modifier) {
    return userId && club.owner === userId;
  },
  remove(userId, club) {
    return userId && club.owner === userId;
  }
});