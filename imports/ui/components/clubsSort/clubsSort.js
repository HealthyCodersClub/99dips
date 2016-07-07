import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './clubsSort.html';
 
class ClubsSort {
  constructor() {
    this.changed();
  }
 
  changed() {
    this.onChange({
      sort: {
        [this.property]: parseInt(this.order)
      }
    });
  }
}
 
const name = 'clubsSort';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    onChange: '&',
    property: '@',
    order: '@'
  },
  controllerAs: name,
  controller: ClubsSort
});