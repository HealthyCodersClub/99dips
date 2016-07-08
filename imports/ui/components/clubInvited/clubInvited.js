import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import { Meteor } from 'meteor/meteor';
 
import template from './clubInvited.html';
import { name as InvitedFilter } from '../../filters/invitedFilter';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
class ClubInvited {
  constructor($scope) {
    'ngInject';
 
    $scope.viewModel(this);
 
    this.helpers({
      users() {
        return Meteor.users.find({});
      }
    });
  }
  remove(user) {
    console.log(user._id);
    Meteor.call('revokeInvitation', this.club._id, user._id,
      (error) => {
        if (error) {
          console.dir(error);
        } else {
          console.log('Revoked!');
        }
      }
    );
  }
}
 
const name = 'clubInvited';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  InvitedFilter,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    club: '<'
  },
  controller: ClubInvited
});