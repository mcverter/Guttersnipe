drop procedure if exists EliminatePoint;
DELIMITER //
CREATE procedure `EliminatePoint`
(
	INOUT points text
)

BEGIN
	DECLARE U int;
	DECLARE V int;
	DECLARE TempA int;
	DECLARE TempB int;
	DECLARE Eliminated int;
	DECLARE Eliminated_Index int;
	DECLARE ReversePoints text;
	DECLARE ReverseEliminated text;
	DECLARE ReverseEliminated_Index int;
	DECLARE StartString text;
	DECLARE EndString text;
	
	DECLARE MAX_EDGE decimal(10,5);
	DECLARE done_loop boolean;
 	DECLARE EdgeCursor cursor for 
    		SELECT F.id as `FROM`, T.id as `to`, 
		       dist(F.lat, F.lng, T.lat, T.lng) as dist 
    		FROM   SampleData F, SampleData T
    		where  F.id < T.id and 
    	               find_in_SET(convert(F.id, char(10)), points) and
         	       find_in_SET(convert(T.id, char(10)), points) 
   		order by dist desc;
	
	set done_loop  = false;

	OPEN EdgeCursor;
	
	fetch FROM EdgeCursor into U, V, MAX_EDGE;
	REPEAT
	     	fetch FROM EdgeCursor into TempA, TempB, MAX_EDGE;
		SELECT TempA, TempB, MAX_EDGE;
		IF ((TempA=U) OR (TempB = U)) THEN
		   SET Eliminated  = V;
		   SET done_loop=true;
		ELSEIF ((TempA=V) OR (TempB = V)) THEN
		   SET Eliminated  = U;
		   SET done_loop = true;
		 END IF;
	UNTIL done_loop = true
	END REPEAT;
	CLOSE EdgeCursor;

	SELECT points;

	SELECT find_in_SET(convert(Eliminated, char(10)), points) 
	       into Eliminated_Index;
	SELECT SUBSTRING_INDEX(points, ',' , Eliminated_Index-1) into StartString;
	SET ReversePoints = REVERSE(points);
	SET ReverseEliminated = REVERSE(convert(Eliminated, char(10)));
	SELECT find_in_SET(ReverseEliminated, ReversePoints) 
	       into ReverseEliminated_Index;		
	SELECT SUBSTRING_INDEX(ReversePoints, ',' , ReverseEliminated_Index-1) into EndString;
	SET EndString = REVERSE (EndString);

	IF (LENGTH(StartString)=0) THEN
	   SET points = EndString;
	ELSEIF (LENGTH(EndString)=0) THEN
	   SET points = StartString;
	ELSE
	   SET points = CONCAT (StartString, ',' , EndString);
	 END IF;

	 SELECT points;
	   		



END;  //
DELIMITER  ;

SET @points = '1,8,12,15,25,50,125';
call EliminatePoint (@points);

