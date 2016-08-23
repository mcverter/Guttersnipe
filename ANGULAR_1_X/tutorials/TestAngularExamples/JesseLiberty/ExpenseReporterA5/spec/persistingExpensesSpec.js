'use strict';

describe('persisting expenses', function(){

    beforeEach(module('app'));

    describe('call backs', function(){

        it('should call back when persisted', inject(function(expensesDataService){
            var spyCallBack = jasmine.createSpy('callBackSpy');
            expensesDataService.persistExpenses(spyCallBack);
            expect(spyCallBack).toHaveBeenCalled();
        }));
    });

    describe('spy on', function() {

        it('should spy on persistExpenses', inject(function (expensesDataService) {
           var spy = spyOn(expensesDataService, 'persistExpenses');
            expensesDataService.persistExpenses();
            expect(spy).toHaveBeenCalled();
        }));

        it('should spy on persistExpenses and fake a reply', inject(function(expensesDataService){
            var spy = spyOn(expensesDataService, 'persistExpenses').and.callFake(function(){
                return 3;
            });
            var numRecordsPersisted = expensesDataService.persistExpenses();
            expect(numRecordsPersisted).toEqual(3);

        }));


    });



});