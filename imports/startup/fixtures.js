import { Meteor } from 'meteor/meteor';
import { Clubs } from '../api/clubs';

Meteor.startup(() => {
  if (Clubs.find().count() === 0) {
    const clubs = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.'
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!'
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.'
    }];

    clubs.forEach((club) => {
      Clubs.insert(club)
    });
  }
});