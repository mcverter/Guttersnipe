
  drop function if exists dist;

  DELIMITER //
  CREATE FUNCTION `dist`(
    lat1  numeric(9,6),
    lon1  numeric(9,6),
    lat2  numeric(9,6),
    lon2  numeric(9,6)
  ) RETURNS decimal(10,5)
    READS SQL DATA
  BEGIN
    DECLARE  x  decimal(20,10);
    DECLARE  pi  decimal(21,20);
    SET  pi = 3.14159265358979323846;
    SET  x = sin( lat1 * pi/180 ) * sin( lat2 * pi/180  ) + cos(lat1 *pi/180 ) *
      cos( lat2 * pi/180 ) * cos(  abs((lon2 * pi/180) -(lon1 *pi/180) ) );
    SET  x = acos( x );
    RETURN ( 1.852 * 60.0 *((x/pi)*180) );
  END; //
  DELIMITER ;


  drop procedure if exists `INITIALIZE_FOREST`;
  DELIMITER //
  CREATE procedure `INITIALIZE_FOREST`(
  	   in points VARCHAR(2047)
  ) 

  BEGIN
	DECLARE  startIndex, endIndex  int;	
	DECLARE pointString varchar(2047);
	DECLARE pointInt int;

	set startIndex=1;

	set endIndex = locate(',', points, startIndex);
	while(endIndex <> 0) do 
		set pointString = substring(points, 
	    		startIndex, endIndex-startIndex);
		set pointInt = pointString + 0;
		insert ignore into ForestTable VALUES(pointInt, pointInt);

		set startIndex = endIndex+1;
		set endIndex = locate(',', points, startIndex);
	end while;

	    set endIndex = length(points);
	    set pointString = substring(points, 
	    	startIndex,(endIndex+1)-startIndex);
	set pointInt = pointString + 0;
	insert ignore into ForestTable VALUES(pointInt, pointInt);


  END  //
DELIMITER ;



drop procedure if exists UnionSet;
DELIMITER //
CREATE PROCEDURE `UnionSet`
(
	fromTree int ,
	toTree int
)
BEGIN
	DECLARE unifiedPoint int;
	DECLARE done_loop boolean;
	DECLARE UnificationCursor CURSOR FOR 
		SELECT  `pointID`  FROM ForestTable 
		where `treeID` = fromTree;
	DECLARE CONTINUE HANDLER FOR NOT FOUND
		SET done_loop = true;

	open UnificationCursor;

	REPEAT

		FETCH FROM UnificationCursor into unifiedPoint;
		INSERT IGNORE INTO ForestTable VALUES(toTree, unifiedPoint)  ;

	UNTIL  done_loop = true
	END REPEAT;

	close UnificationCursor;


	DELETE FROM ForestTable WHERE `treeID` = fromTree;
	
END //
DELIMITER ;


drop procedure if exists EliminatePoint;
DELIMITER //
CREATE procedure `EliminatePoint`
(
	INOUT points varchar(2047)
)

BEGIN
	DECLARE U int;
	DECLARE V int;
	DECLARE TempA int;
	DECLARE TempB int;
	DECLARE NumElementsString char(10);
	DECLARE NumElements int;
	DECLARE ElementCounter int;
	DECLARE Element char(10);
	DECLARE TempPoints varchar(2047);
	DECLARE Eliminated int;
	DECLARE EliminatedText char(10);
	DECLARE Eliminated_Index int;
	DECLARE ReversePoints varchar(2047);
	DECLARE ReverseEliminated char(10);
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
/*
		SELECT U, V, MAX_EDGE;
*/
		IF((TempA=U) OR(TempB = U)) THEN
		   SET Eliminated  = V;
		   SET done_loop=true;
		ELSEIF((TempA=V) OR(TempB = V)) THEN
		   SET Eliminated  = U;
		   SET done_loop = true;
		 END IF;
	UNTIL done_loop = true
	END REPEAT;
	CLOSE EdgeCursor;

	SET EliminatedText = CAST(Eliminated AS char(10));	
	SET NumElementsString = LENGTH(points) - LENGTH(REPLACE(points, ',', '')) ;


	SET NumElements = CAST(NumElementsString AS SIGNED) ;


	SET ElementCounter = 1;
	SET TempPoints = "";
	WHILE(ElementCounter <=(NumElements+1)) DO
	      Set Element = SPLIT_STR(points, ',', ElementCounter);
	      Set Element = TRIM(Element);
	      Set EliminatedText = TRIM(EliminatedText);
	      IF(STRCMP(Element, EliminatedText) != 0) THEN
	      	 SET TempPoints = CONCAT(TempPoints, ',' , Element);
		END IF;
	     SET ElementCounter = ElementCounter +1 ;

	END WHILE; 
	
	SET points = SUBSTRING(TempPoints, 2);


	

/*	SELECT find_in_SET(convert(Eliminated, char(10)), points) 
	       into Eliminated_Index;
	SELECT SUBSTRING_INDEX(points, ',' , Eliminated_Index-1) into StartString;
	SET ReversePoints = REVERSE(points);
	SET ReverseEliminated = REVERSE(convert(Eliminated, char(10)));
	SELECT find_in_SET(ReverseEliminated, ReversePoints) 
	       into ReverseEliminated_Index;		
	SELECT SUBSTRING_INDEX(ReversePoints, ',' , ReverseEliminated_Index-1) into EndString;
	SET EndString = REVERSE(EndString);

	IF(LENGTH(StartString)=0) THEN
	   SET points = EndString;
	ELSEIF(LENGTH(EndString)=0) THEN
	   SET points = StartString;
	ELSE
	   SET points = CONCAT(StartString, ',' , EndString);
	 END IF;
*/
/*
	 SELECT points;
*/	   		


END;  //
DELIMITER  ;

/*
SET @points = '1,8,12,15,25,50,125';
call EliminatePoint(@points);
*/

drop FUNCTION if exists SPLIT_STR;
DELIMITER //
CREATE FUNCTION SPLIT_STR
(
  x VARCHAR(2047),
  delim VARCHAR(12),
  pos INT
)

RETURNS VARCHAR(2047)
BEGIN
RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),
       LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),
       delim, '');
END //
DELIMITER ;

  drop procedure if exists Kruskal;
DELIMITER //
  CREATE procedure `Kruskal`
(
  	 in   points varchar(2047),
	 out total decimal(10,5)
  ) 
    BEGIN
	DECLARE done_loop boolean;
	DECLARE U int;
	DECLARE V int;
	DECLARE UTree int;
	DECLARE VTree int;
	DECLARE weight decimal(10,5);
 	DECLARE EdgeCursor cursor for 
    		SELECT F.id as `FROM`, T.id as `to`, 
		       dist(F.lat, F.lng, T.lat, T.lng) as dist 
    		FROM   SampleData F, SampleData T
    		where  F.id < T.id and 
    	               find_in_SET(convert(F.id, char(10)), points) and
         	       find_in_SET(convert(T.id, char(10)), points) 
   		order by dist;
	DECLARE CONTINUE HANDLER FOR NOT FOUND
		SET done_loop = true;


-- initialize the forestTable
   DROP TABLE IF EXISTS    ForestTable ;
   create table ForestTable( treeID int, pointID int, unique(treeID, pointID));

   CALL INITIALIZE_FOREST (points);  

/*
   select "in kruskal", points;
*/
   DROP TABLE IF EXISTS EdgeTable;
   CREATE TABLE EdgeTable(U int, V int,  edgeLen decimal(10,5), unique(U,V));

	open EdgeCursor;

      	REPEAT
   	 	fetch FROM EdgeCursor into U, V, weight;
	
		select  `treeID`  
			from ForestTable 
			where `pointID`= U 
			into UTree;

		select  `treeID`  
			from ForestTable 
			where `pointID`= V 
			into VTree;

		IF(UTree <> VTree) then
		   INSERT IGNORE INTO EdgeTable VALUES(U,V,weight);
		   CALL UnionSet(UTree,VTree);
		END IF;

	UNTIL  done_loop = true
	END REPEAT;
	close EdgeCursor;
/*
	SELECT * FROM  EdgeTable;
*/	
	SELECT SUM(edgeLen) from EdgeTable into total;
/*
	SELECT total;
*/
  END //
  DELIMITER ;


  drop procedure if exists LimitedKruskal;
DELIMITER //
  CREATE procedure `LimitedKruskal`
(
	inout points varchar(2047),
	in distanceLimit decimal(10,5),	
	out limitedTotal decimal(10,5)
)
BEGIN
	DECLARE tempPoints text;
	DECLARE trimIndex int;	

	call Kruskal(points, limitedTotal);
/*
	select "in limited kruskal";
*/

/*
	select points, limitedTotal, distanceLimit;
*/
	WHILE(limitedTotal > distanceLimit) DO 
/*
	      set trimIndex = locate(',', points);
	      set points = substring(points, trimIndex+1);
*/
	      call EliminatePoint(points);
	      call Kruskal(points, limitedTotal);
 
/*
	      select points, limitedTotal;
*/

	end WHILE;	
END //
DELIMITER ;

/*
call LimitedKruskal('1,8,12,15,25,50,125', 22, @totalTrip);
SELECT @totalTrip;	


call LimitedKruskal('1,8,12,15,25,50,125', 10, @totalTrip);
SELECT @totalTrip;	



call  kruskal('8,27,55,75,96,110,120,131,154,179,185,192,222,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495', @length); SELECT @length;


*/

SET @pointList = '8,27,55,75,96,110,120,131,154,179,185,192,222,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495'; CALL LimitedKruskal(@pointList, 25, @length); SELECT @length as 'length', @pointList as 'pointList' ;

SET @pointList = '8,27,55,75,96,110,120,131,154,179,185,192,222,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495'; CALL LimitedKruskal(@pointList, 10, @length); SELECT @length as 'length', @pointList as 'pointList' ;

SET @pointList = '8,27,55,75,96,110,120,131,154,179,185,192,222,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495'; CALL LimitedKruskal(@pointList, 3, @length); SELECT @length as 'length', @pointList as 'pointList' ;


CALL kruskal('75,110,120,131,179,236,277,299,360,366,385,389,390,420,428,431,454,494,495', @length); SELECT @length;

CALL kruskal('8,27,55,75,96,110,120,131,154,179,185,192,222,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495', @length); SELECT @length;


SET @x =  SPLIT_STR('8,27,55,75,96,110,120,131,154,179,185,192,222,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495', ',', 7); SELECT @x;