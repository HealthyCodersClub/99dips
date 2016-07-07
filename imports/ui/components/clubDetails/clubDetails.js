import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './clubDetails.html';
import { Clubs } from '../../../api/clubs';
import { name as ClubUninvited } from '../clubUninvited/clubUninvited';

class ClubDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.clubId = $stateParams.clubId;
    this.subscribe('clubs');
    this.subscribe('users');
    this.helpers({
      club() {
        return Clubs.findOne({
          _id: $stateParams.clubId
        });
      },
      users(){
        return Meteor.users.find({});
      }
    });
  }

  save() {
    Clubs.update({
      _id: this.club._id
    }, {
      $set: {
        name: this.club.name,
        description: this.club.description,
        public: this.club.public
      }
    }, (error) => {
      if (error) {
        console.log('Oops, unable to update the club...');
      } else {
        console.log('Done!');
      }
    });
  }
}

const name = 'clubDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ClubUninvited
]).component(name, {
  template,
  controllerAs: name,
  controller: ClubDetails
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('clubDetails', {
    url: '/clubs/:clubId',
    template: '<club-details></club-details>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}
