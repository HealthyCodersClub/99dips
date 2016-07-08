import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './99dips.html';
import {name as ClubsList} from '../clubsList/clubsList';
import {name as ClubDetails} from '../clubDetails/clubDetails';

import {name as Navigation} from '../navigation/navigation';

class dips99 { }

const name = 'dips99';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Navigation,
  'accounts.ui',
  ClubsList,
  ClubDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: dips99
});
