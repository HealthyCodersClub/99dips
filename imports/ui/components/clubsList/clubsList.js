import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './clubsList.html';
import { Clubs } from '../../../api/clubs';
import { name as ClubAdd } from '../clubAdd/clubAdd';
import { name as ClubRemove } from '../clubRemove/clubRemove';

class ClubsList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    this.subscribe('clubs');
    this.helpers({
      clubs() {
        return Clubs.find({});
      }
    });
  }
}

const name = 'clubsList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ClubAdd,
  ClubRemove
]).component(name, {
  template,
  controllerAs: name,
  controller: ClubsList
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('clubs', {
      url: '/clubs',
      template: '<clubs-list></clubs-list>'
    });
}
