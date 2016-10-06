(function(){
    'use strict'

    angular.module('app')
        .factory('expensesDataService', ['$http', expensesDataService]);

    function expensesDataService($http){
        var service = {
            getExpenses: getExpenses,
            persistExpenses : persistExpenses
        };

        return service;

        function getExpenses(){
            return [
                new ExpenseItem('Taxi', 'To airport',  89.95),
                new ExpenseItem('Dinner', 'At airport', 15.40),
                new ExpenseItem('Coffee','Starbucks', 4.93)
            ]
        }

        function reportExpenses(){
            // some work
        }

        function persistExpenses(reportExpenses){
            // do some work
            var success = true;
            if (success){
                reportExpenses();
            }
        }
    }
})();