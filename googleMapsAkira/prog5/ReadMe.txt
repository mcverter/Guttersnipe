This implements the most basic outline of the assignment

The file Dijkstra.sql contains the code for implementing Dijkstra's algortithm iteratively.
It does not yet know how to safely drop an edge during the iterative step so it will end computation 
if it gets stuck.

The algorithm runs very slowly.   With an input of 15 points, it might take 10 seconds and only produce a 5-point graph.

The  php files support the implementation of the SQL procedure.

If the user does not supply a start and an end point, the SQL will not be called.  But neither will there be an error message for the user.  

