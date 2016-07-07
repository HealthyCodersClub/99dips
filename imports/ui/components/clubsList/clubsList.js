import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './clubsList.html';
import { Clubs } from '../../../api/clubs';
import { name as ClubsSort } from '../clubsSort/clubsSort';
import { name as ClubAdd } from '../clubAdd/clubAdd';
import { name as ClubRemove } from '../clubRemove/clubRemove';
import { name as ClubCreator } from '../clubCreator/clubCreator';

class ClubsList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    this.perPage = 3;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';
    this.subscribe('clubs', () => [{
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')
    }, this.getReactively('searchText')
    ]);
    this.helpers({
      clubs() {
        return Clubs.find({},{
          sort : this.getReactively('sort')
        });
      },
      clubsCount(){
        return Counts.get('numberOfClubs');
      }
    });
  }
  pageChanged(newPage) {
    this.page = newPage;
  }
  sortChanged(sort) {
    this.sort = sort;
  }
}


const name = 'clubsList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ClubsSort,
  ClubAdd,
  ClubRemove,
  ClubCreator
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
