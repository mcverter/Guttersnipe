/**
 * Created by Jesse on 3/22/2014.
 */
describe ('Expense', function(){
   it('should be an expense', function(){
       var expenseEntry = new ExpenseEntry();
       var expense = new Expense(expenseEntry);
        expect(expense.expenseEntry).toBe(expenseEntry);
   }) ;
});