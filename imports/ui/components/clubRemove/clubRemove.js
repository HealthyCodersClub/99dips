import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './clubRemove.html';
import { Clubs } from '../../../api/clubs/index';

class ClubRemove {
  remove() {
    if (this.club) {
      Clubs.remove(this.club._id);
    }
  }
}

const name = 'clubRemove';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    club: '<'
  },
  controllerAs: name,
  controller: ClubRemove
});
