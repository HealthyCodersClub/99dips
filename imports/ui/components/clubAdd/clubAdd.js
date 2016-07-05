import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './clubAdd.html';
import { Clubs } from '../../../api/clubs/index';

class ClubAdd {
  constructor() {
    this.club = {};
  }

  submit() {
    this.club.owner = Meteor.user()._id;
    Clubs.insert(this.club);
    this.reset();
  }

  reset() {
    this.club = {};
  }
}

const name = 'clubAdd';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: ClubAdd
});
