import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as _99dips } from '../imports/ui/components/99dips/99dips';

function onReady() {
  angular.bootstrap(document, [
    _99dips
  ], {
    strictDi: true
  });
}
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}