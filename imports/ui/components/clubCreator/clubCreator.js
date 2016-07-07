import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import { Meteor } from 'meteor/meteor';
 
import template from './clubCreator.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
/**
 * ClubCreator component
 */
class ClubCreator {
  constructor($scope) {
    'ngInject';
 
    $scope.viewModel(this);
 
    this.helpers({
      creator() {
        if (!this.club) {
          return '';
        }
 
        const owner = this.club.owner;
 
        if (Meteor.userId() !== null && owner === Meteor.userId()) {
          return 'me';
        }
 
        return Meteor.users.findOne(owner) || 'nobody';
      }
    });
  }
}
 
const name = 'clubCreator';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    club: '<'
  },
  controller: ClubCreator
});