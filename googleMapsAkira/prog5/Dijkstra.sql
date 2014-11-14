/*
these are the tables we are using for the code.
EDGES records the lengths of the edges

DISTANCES records the distance to each point

UNVISITED records the points that have not yet been visited

PATH_EDGES records the edges in the tree.
*/

/*
FUNCTION:  dist

returns the length between two points 

*/
drop function if exists dist; 
  DELIMITER //
  CREATE FUNCTION `dist`(
    lat1  numeric (9,6),
    lon1  numeric (9,6),
    lat2  numeric (9,6),
    lon2  numeric (9,6)
  ) RETURNS decimal(10,5)
    READS SQL DATA
  BEGIN
    DECLARE  x  decimal (20,10);
    DECLARE  pi  decimal (21,20);
    SET  pi = 3.14159265358979323846;
    SET  x = sin( lat1 * pi/180 ) * sin( lat2 * pi/180  ) + cos(lat1 *pi/180 ) *
      cos( lat2 * pi/180 ) * cos(  abs( (lon2 * pi/180) - (lon1 *pi/180) ) );
    SET  x = acos( x );
    RETURN  ( 1.852 * 60.0 * ((x/pi)*180) );
  END; //
  DELIMITER ;


/*
Initializes the tables we use in this file.

EDGES:  all edges are caluculated
DISTANCES : all points have 100000 distance
UNVISITED :  all points are unvisited
PATH_EDGES : no edges are in path

1,  Assign to every node a tentative distance value: 
    set it to zero for our initial node and to infinity for all other nodes.
2.   Mark all nodes unvisited. 
     Set the initial node as current. 
    Create a set of the unvisited nodes called the 
     unvisited set consisting of all the nodes except the initial node.

*/
drop procedure if exists `INITIALIZE_TABLES` ; 
DELIMITER //
create procedure `INITIALIZE_TABLES`
(
	points text
)
BEGIN
DECLARE done_loop boolean; 
DECLARE U int;
DECLARE V int;
DECLARE weight decimal (10,5);
DECLARE currentPoint int;
DECLARE EdgeCursor cursor for 
SELECT v1, v2, distance from EDGES;
	DECLARE CONTINUE HANDLER FOR NOT FOUND
		SET done_loop = true;



drop table if exists `DISTANCES`;
create  table `DISTANCES` 
       (point int, distance decimal (10,5), unique (point, distance));

drop table if exists `UNVISITED`;
create  table `UNVISITED`
       (point int, unique(point));

drop table if exists `PREVIOUS_POINT`;
create table `PREVIOUS_POINT`
       ( previousPoint int, nextPoint int, unique (nextPoint));

drop table if exists `TempPath`;
create table `TempPath`
       (v1 int, v2 int, unique (v1,v2));



set done_loop = false;

open EdgeCursor;
REPEAT
 	fetch FROM EdgeCursor into U, V, weight;
	insert ignore into UNVISITED VALUES (U);
	insert ignore into UNVISITED VALUES (V);
	insert ignore into DISTANCES VALUES (U, 100000);
	insert ignore into DISTANCES VALUES (V, 100000);
UNTIL done_loop = true
END repeat;
close EdgeCursor;
END; //
delimiter ;



/*

3.  For the current node, consider all of its unvisited neighbors 
and calculate their tentative distances. 

For example, if the current node A is marked 
with a tentative distance of 6, 
and the edge connecting it with a neighbor B has length 2, 
then the distance to B (through A) will be 6+2=8. 
If this distance is less than the previously recorded 
tentative distance of B, then overwrite that distance. 
Even though a neighbor has been examined, 
it is not marked as "visited" at this time, and 
it remains in the unvisited set.

*/
drop procedure if exists `Update_Neighbors`;
delimiter //
create procedure `Update_Neighbors`
(
	currentPoint int,
	currentDistance decimal (10,5)
)
BEGIN       
	DECLARE U int;
	DECLARE V int;
	DECLARE edgeDistance decimal (10,5);
	DECLARE neighborPoint int;
	DECLARE neighborDistance decimal (10,5);
	DECLARE distanceThroughCurrent decimal (10,5);
	DECLARE done_neighbor_loop boolean; 
	DECLARE NeighborCursor CURSOR FOR
		select `v1`, `v2`, `distance`  
		from EDGES 
		where `v1`=currentPoint 
	      		and `v2` in (SELECT `point` from UNVISITED)
			or `v2`=currentPoint
				and `v1` in (SELECT `point` from UNVISITED);
	DECLARE CONTINUE HANDLER FOR NOT FOUND
		SET done_neighbor_loop = true;


	SET done_neighbor_loop = false;
 
   /* update the distances of all the neighbors  */
	open NeighborCursor ;
	REPEAT 
		fetch FROM NeighborCursor into U,V, edgeDistance;
		
		if (U=currentPoint) then
			set neighborPoint = V;
		else 
			set neighborPoint=U;
		end if;

		select `distance` 
			from DISTANCES
			where `point`= neighborPoint
			into neighborDistance;

		set distanceThroughCurrent = currentDistance+edgeDistance;

		if (neighborDistance > distanceThroughCurrent) then
			update DISTANCES 
				set `distance`=distanceThroughCurrent 
					where `point` = neighborPoint;
			if exists 
				(select `nextPoint` from `PREVIOUS_POINT` 
					where `nextPoint`=neighborPoint) then 
					UPDATE `PREVIOUS_POINT` 
						set  `previousPoint` = currentPoint 
						WHERE `nextPoint` = neighborPoint;
			else 
			     INSERT into PREVIOUS_POINT 
			     (`previousPoint`, `nextPoint`)
	    	   	     VALUES ( currentPoint, neighborPoint);
			end if;
		end if;
    UNTIL done_neighbor_loop = true
    END REPEAT;
    close NeighborCursor;

END;  //
delimiter ;


drop procedure if exists `CopyTempToFinal`;
delimiter //
create procedure `CopyTempToFinal`
(
)
BEGIN
DECLARE done_loop boolean;
DECLARE V int;
DECLARE U int;

DECLARE TempCursor cursor for
Select v1, v2 FROM TempPath;

DECLARE CONTINUE HANDLER FOR NOT FOUND
SET done_loop = true;

delete from FinalPath;

open TempCursor;
REPEAT
     fetch from TempCursor into U, V;
     insert ignore into FinalPath VALUES(U,V);
UNTIL done_loop=true
END REPEAT;

END ; //
DELIMITER ;

drop procedure if exists `ReconstructPath`;
delimiter //
create procedure `ReconstructPath`
(
	startpoint int,
	endpoint int
)
BEGIN       
/* NB:  we are reconstructing backwards, from end to start*/ 
DECLARE Nx int;
DECLARE Pv int;
DECLARE TempCount int;
DECLARE FinalCount int;

	Set Nx = endpoint;

	REPEAT
	    SELECT previousPoint 
	    FROM PREVIOUS_POINT
	    where nextPoint=Nx
	    INTO Pv;

	    INSERT IGNORE INTO TempPath VALUES (Nx, Pv);
	    
	    Set Nx=Pv;

/* code to break us out of a bad loop */
	    IF (Nx IS NULL) then
			set Nx=startpoint;
		end if;

	UNTIL Nx=startpoint
	END REPEAT;

	SELECT Count(*) FROM TempPath into TempCount;
	SELECT Count(*) FROM FinalPath into FinalCount;

	if (TempCount >FinalCount) then
		CALL CopyTempToFinal();
	end if;
	
END ; //
DELIMITER ;

/*
4.  When we are done considering all of the neighbors 
of the current node, 
mark the current node as visited and remove it from the unvisited set.
 A visited node will never be checked again; 
its distance recorded now is final and minimal.

5.  If the destination node has been marked visited 
(when planning a route between two specific nodes) 
or if the smallest tentative distance among the nodes 
in the unvisited set is infinity (when planning a complete traversal), 
then stop. The algorithm has finished.

6.  Set the unvisited node marked with the smallest tentative distance
 as the next "current node" and go back to step 3 
[ UPDATE_NEIGHBORS].
*/

drop procedure if exists dijkstra;
delimiter //
create procedure dijkstra
(
	points text,
	startpoint int,
	endpoint int
)
BEGIN       

	DECLARE currentPoint int;
	DECLARE done_currentPoint_loop boolean;
	DECLARE currentDistance decimal (10,5);

	call INITIALIZE_TABLES (points);

/*	select "in dijkstra";*/

	update DISTANCES set `distance`=0 where `point`=startPoint;

	set currentPoint=startPoint;
	set currentDistance=0;
	set done_currentPoint_loop = false;

	REPEAT 
		CALL Update_Neighbors(currentPoint, currentDistance);

		if (((select count(`point`) FROM UNVISITED)>= 1)
			AND
			endpoint in (select * from UNVISITED)) 
		then
			set done_currentPoint_loop = false;
		else
			set done_currentPoint_loop = true;	
		end if;
		
		delete from UNVISITED where `point` = currentPoint;

		if (done_currentPoint_loop = false) then
			select `point`, `distance` 
				from DISTANCES 
				where `point` 
				in (select * from UNVISITED) 
				group by distance
				LIMIT 1
				into currentPoint, currentDistance; 
		end if;
    UNTIL done_currentPoint_loop = true
    END REPEAT;
    CALL ReconstructPath(startPoint, endPoint);
END ; //
DELIMITER ;


drop procedure if exists DeleteEdge;
delimiter //
create procedure DeleteEdge
(
	inout edge_deleted boolean
)
BEGIN      
	DECLARE U int;
	DECLARE V int;
	DECLARE UCount int;
	DECLARE VCount int;
	DECLARE maxDist decimal (10,5);
	DECLARE done_loop boolean;
	DECLARE MaxEdgeCursor cursor for 
	      select TempPath.v1, TempPath.v2, distance 
	      from TempPath, EDGES 	    
	      where (TempPath.v1=EDGES.v1 
	      	    and TempPath.v2=EDGES.v2)  
	      OR          	  
	      (TempPath.v2=EDGES.v1
			and TempPath.v1=EDGES.v2) 
		group by distance desc ;
	DECLARE CONTINUE HANDLER FOR NOT FOUND
		SET done_loop = true;

	set done_loop=false;

	open MaxEdgeCursor;
	REPEAT
		fetch FROM MaxEdgeCursor into U, V, MaxDist;

		select count(*) from EDGES where `v1`=U or `v2`=U into UCount;
		select count(*) from EDGES where `v1`=V or `v2`=V into VCount;

		if ((V IS NOT NULL) and (U IS NOT NULL) and
			(VCount > 1) and (UCount > 1)) then
			delete from EDGES 
				where (`v1`=U and `v2`=V) 
				OR  (`v1`=V and `v2`=U) ; 
			set done_loop=true;
			set edge_deleted=true;
		else
			set edge_deleted=false;
		end if;	
	
	UNTIL done_loop = true
	END repeat;

	close MaxEdgeCursor;
END ; //
DELIMITER ;

drop procedure if exists ReducedDijkstra;
delimiter //
create procedure ReducedDijkstra
(
	points text,
	startpoint int,
	endpoint int
)
BEGIN      
	DECLARE U int;
	DECLARE V int;
	DECLARE weight decimal (10,5);
	DECLARE endCount_1 int;
	DECLARE endCount_2 int;
	DECLARE endCount_TOTAL int;
	DECLARE MaxDist decimal (10,5);
	DECLARE done_loop boolean;
	DECLARE edge_deleted boolean;
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

drop temporary table if exists `EDGES`;
create  temporary table `EDGES`
 	(v1 int, v2 int , distance decimal (10,5), unique(v1,v2,distance));


drop  table if exists `FinalPath`;
create temporary table `FinalPath`
       (v1 int, v2 int, unique (v1,v2));



	open EdgeCursor;

	REPEAT
		fetch FROM EdgeCursor into U, V, weight;
		insert ignore into EDGES VALUES (U,V,weight);
	UNTIL done_loop = true
	END repeat;
	close EdgeCursor;

	set edge_deleted=false;
	REPEAT
		call dijkstra(points, startpoint, endpoint);
		call DeleteEdge(edge_deleted);
	UNTIL edge_deleted=false
	END REPEAT;
	Select * from FinalPath;
END ; //
DELIMITER ;


CALL  ReducedDijkstra ( '8,27,55,75,96,110,120,131,154,179', 8, 179);
/*CALL ReducedDijkstra ('8,27,55,75,96,110,120,131,179,185,192,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495', 192, 454); */

/*  SELECT * FROM SampleData WHERE ('id' in CALL  ReducedDijkstra (',8,27,55,75,96,110,120,131,179,185,192,236,249,251,277,287,296,298,299,360,366,385,389,390,420,422,428,431,454,494,495', 120, 236); */

