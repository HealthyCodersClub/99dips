import { name as ClubAdd } from '../clubAdd';
import { Parties } from '../../../../api/parties';
import 'angular-mocks';

describe('ClubAdd', () => {
  beforeEach(() => {
    window.module(ClubAdd);
  });

  describe('controller', () => {
    let controller;
    const club = {
      name: 'Foo',
      description: 'Birthday of Foo'
    };

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(ClubAdd, {
          $scope: $rootScope.$new(true)
        });
      });
    });

    describe('reset()', () => {
      it('should clean up club object', () => {
        controller.club = club;
        controller.reset();

        expect(controller.club).toEqual({});
      });
    });

    describe('submit()', () => {
      beforeEach(() => {
        spyOn(Parties, 'insert');
        spyOn(controller, 'reset').and.callThrough();

        controller.club = club;

        controller.submit();
      });

      it('should insert a new club', () => {
        expect(Parties.insert).toHaveBeenCalledWith(club);
      });

      it('should call reset()', () => {
        expect(controller.reset).toHaveBeenCalled();
      });
    });
  });
});
