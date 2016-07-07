import { name as ClubCreator } from '../clubCreator';
import { Meteor } from 'meteor/meteor';
import 'angular-mocks';
 
describe('ClubCreator', () => {
  beforeEach(() => {
    window.module(ClubCreator);
  });
 
  describe('controller', () => {
    let $rootScope;
    let $componentController;
    const club = {
      _id: 'clubId'
    };
 
    beforeEach(() => {
      inject((_$rootScope_, _$componentController_) => {
        $rootScope = _$rootScope_;
        $componentController = _$componentController_;
      });
    });
 
    function component(bindings) {
      return $componentController(ClubCreator, {
        $scope: $rootScope.$new(true)
      }, bindings);
    }
 
    it('should return an empty string if there is no club', () => {
      const controller = component({
        club: undefined
      });
 
      expect(controller.creator).toEqual('');
    });
 
    it('should say `me` if logged in is the owner', () => {
      const owner = 'userId';
      // logged in
      spyOn(Meteor, 'userId').and.returnValue(owner);
      const controller = component({
        club: {
          owner
        }
      });
 
      expect(controller.creator).toEqual('me');
    });
 
    it('should say `nobody` if user does not exist', () => {
      const owner = 'userId';
      // not logged in
      spyOn(Meteor, 'userId').and.returnValue(null);
      // no user found
      spyOn(Meteor.users, 'findOne').and.returnValue(undefined);
      const controller = component({
        club: {
          owner
        }
      });
 
      expect(controller.creator).toEqual('nobody');
    });
 
    it('should return user data if user exists and it is not logged one', () => {
      const owner = 'userId';
      // not logged in
      spyOn(Meteor, 'userId').and.returnValue(null);
      // user found
      spyOn(Meteor.users, 'findOne').and.returnValue('found');
      const controller = component({
        club: {
          owner
        }
      });
 
      expect(controller.creator).toEqual('found');
    });
  });
});