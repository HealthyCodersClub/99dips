import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './home.html';

import {name as ClubsList} from '../clubsList/clubsList';
import {name as ClubDetails} from '../clubDetails/clubDetails';


class home { }

const name = 'home';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ClubDetails,
  ClubsList,
  'accounts.ui'
]).component(name, {
  template,
  controllerAs: name,
  controller: home
})
.config(config)
.run(run);

/**
 * Run configuration
 * @param {string} $rootScope : Rootscope of application
 * @param {object} $state : state of application;
 */
function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('clubs');
      }
    }
  );
}
/**
 * Configuration function
 * @param {Object} $locationProvider : location provider details
 * @param {Object} $urlRouterProvider : urlRouter Provider details
 */
function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/clubs');
}
