<?php  

require("dbinfo.php"); 

function knapsackBacktrack($allowance, $allExpenses )
{
  //  debugPrint();
}
function knapsackGreedy($allowance, $allExpenses)
{
  /*  
debugPrint("In knapsackGreedy.  Allowance is " . $allowance . 
	     "allExpenses is " . print_r($allExpenses, TRUE));
  */ 
  
  $total=0;
  $sortedItems=array();
  $index=0;


  asort ( $allExpenses );
  //debugPrint("Sorted All expenses is " . print_r($allExpenses, TRUE));

  $total = array_sum ($allExpenses);

    while ($total > $allowance)
      {
		$pMax = array_pop($allExpenses);
		$total -= $pMax;
      }


    //debugPrint("In knapsackGreedy.  All Remaining Expenses is " . print_r($allExpenses, TRUE));
    //debugPrint("In knapsackGreedy.  Total  is $total . Allowance is $allowance" );

    
    return $allExpenses;
	  
}


function debugPrint($msg)
{
  file_put_contents('php://stderr', print_r("\n$msg\n", TRUE));
}


//debugPrint("in generate markers");

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");



$parnode = $dom->appendChild($node); 


// Opens a connection to a MySQL server


$mysqli=mysqli_connect ($hostname, $username, $password);
if (!$mysqli) {  die('Not connected : ' . mysqli_error());} 

// Set the active MySQL database

$db_selected = $mysqli->select_db($database);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysqli_error());
} 



//*********************************
//
// PROCESS ALL THE GET VARIABLES
// GENERATE THE ARGUMENTS FOR THE SQL CALL
//
//*********************************





//*********************************
//
// PROCESS THE LAT AND LONG COORDINATES
//
//*********************************
$center;
$ctrLat;
$ctrLng;

if (isset($_GET["C"]))
  {
    $center =  $_GET["C"]; 
    debugPrint("Center is " . $center);
    $pattern = "/(.*),(.*)/";
    preg_match( $pattern, $center, $regs);
    $ctrLat = $regs[1];
    $ctrLng = $regs[2];
    //debugPrint("\nLatitude is " . $ctrLat . " Longditude is " . $ctrLng . "\n");
  }


//*********************************
//
// PROCESS THE RADIUS 
//
//*********************************

$radius;
if (isset($_GET["R"]))
  {
    $radius =  $_GET["R"];
  } 


//*********************************
//
//  PROCESS CIRCULAR OPTION 
//
//*********************************

$circular;
if (isset($_GET["O"]))
  {
    $circular = $_GET["O"];
  }


//*********************************
//
//  DETERMINE SQL BASED ON 
//  LAT, LNG, RADIUS, and CIRCULAR   
//
//*********************************

$coordinateConstraint = "1";
$conversionConstant = 69.172;
if ($circular == 'N')
  {
    $latSpread = $radius / $conversionConstant;
    $lngSpread = $radius / 
      ($conversionConstant * cos((double)$ctrLat));  


    $topLat = $ctrLat + $latSpread;
    $botLat = $ctrLat - $latSpread;

    // longditude is negative so it's switched around
    $topLng = $ctrLng - $lngSpread;
    $botLng = $ctrLng + $lngSpread;
    $coordinateConstraint = " ( lat >= $botLat and lat <= $topLat and lng >= $botLng and lng <= $topLng) " ;
  }


// CIRCULAR IS (DeltaLat)^2 + (DeltaLng)^2 <= (Radius)^2
else if ($circular == 'Y')
  {

    $coordinateConstraint = " ( ( (( lat - $ctrLat ) * $conversionConstant) * (( lat - $ctrLat ) * $conversionConstant)) +  ((( lng - $ctrLng ) * $conversionConstant * cos($ctrLat)) * (( lng - $ctrLng ) * $conversionConstant * cos($ctrLat)))) <=  ($radius * $radius) " ;
    
  }


//*********************************
//
//  PROCESS TYPE CONSTRAINTS 
//
//*********************************

$typeConstraint = "1";

if ((isset($_GET["T"])) 
    && (!empty($_GET["T"]))) 
  {
    $typeList = $_GET["T"];
    
    $typeArray = split(",", $typeList);
    
    $typeConstraint = "  (";
    
    for ($i=1; $i<count($typeArray); $i++)
      {
	if ($i != 1)
	  {
	    $typeConstraint .= " or ";
	  }
	$typeConstraint .= " type=" . $typeArray[$i] . " ";
      }
    $typeConstraint .= ")";
  }
else  // no types selected, so we pass a bogus value
  {
    $typeConstraint = " ( type=10000 ) ";
  }
 


//*********************************
//
//  PROCESS ITEM CONSTRAINTS 
//
//*********************************

$itemConstraint = "1";

$useItemConstraints = 'N';

$itemList;
$itemArray;
$itemConstraint;

if (isset ($_GET["Z"]))
  {
    $useItemConstraints = $_GET["Z"];
  }
//debugPrint ("Use tem constraints is $useItemConstraints\n");
if (($useItemConstraints == 'Y')
    || isset ($_GET["B"])
    || isset ($_GET["D"])
    )
  {
    if ((isset($_GET["F"])) 
	&& (!empty($_GET["F"]))) 
      {
	$itemList = $_GET["F"];
	
	debugPrint("Item list is $itemList");
	$itemArray = split(",", $itemList);
	
	$itemConstraint = "  ( ";
	
	for ($i=1; $i<count($itemArray); $i++)
	  {
	    if ($i != 1)
	      {
		$itemConstraint .= " or ";
	      }
	    $itemConstraint .= " id=" . $itemArray[$i] . " ";
	  }
	$itemConstraint .= ")";
      }
    else  // all types
      {
      }
  }



//*********************************
//
// PROCESS THE ALLOWANCE 
//
//*********************************


$doAllowance = "N";
$allowance = 0;

if (isset ($_GET["B"]))
  {
    $doAllowance = $_GET["B"];
    if ($doAllowance == 'Y')
      {
	if (isset ($_GET["A"]))
	  {
	    $allowance = $_GET["A"];
	    
	    debugPrint ("In allowance Conditional.  Allowance is " . $allowance);
	    debugPrint ("In allowance Conditional.  \$itemConstraint is " . $itemConstraint);
	    debugPrint ("In allowance Conditional.  \$itemList is " . $itemList);
	    
	    if ($allowance > 0)
	      {	//$itemList = $_GET["F"];
		
		if (isset ($itemList) &&
		    isset($itemConstraint))
		  {
		    $expenseQuery =  "SELECT * FROM SampleData WHERE  $itemConstraint";
		    debugPrint ("\nEXPENSE QUERY: $expenseQuery\n");
		    $allExpenses = array();
		    
		    $expenseResult = $mysqli->query($expenseQuery);
					
		    if (!$expenseResult) 
		      {  
			die('Invalid query for EXPENSE: ' . $mysqli->error);
		      } 
		    
		    while ($expenseRow = $expenseResult->fetch_assoc())
		      {  
			//NEED TO GET ID AS WELL
			$id = $expenseRow['id'];
			$expense  = $expenseRow['expense'];

			if ($expense <= $allowance)
			  {
			    $idToExpenses {$id} = $expense;
			  }
		      }
		    $knapsackers = knapsackGreedy ($allowance, $idToExpenses);

		    		    debugPrint("Return value from Knapsack Greedy is " . print_r($knapsackers, TRUE));

		    $budgetConstraint = " ( id=0 ";

		    
		    
		    foreach (array_keys($knapsackers) as $destination)
		      {
			$budgetConstraint .= " or id=$destination ";
		      }
		    
		    $budgetConstraint .= " ) " ;
		    // debugPrint(" budget Constraint is " . $budgetConstraint);
			
		    
		  }
	      }
	      
	  }
      }
  }


//*********************************
//
// PROCESS THE DISTANCE ALLOWANCE 
//
//*********************************


$doDistanceAllowance = "N";
$distanceAllowance = 0;
$mstLength = 0; 

if (isset ($_GET["D"]))
  {
    $doDistanceAllowance = $_GET["D"];
    if ($doDistanceAllowance == 'Y')
      {

	debugPrint("In distance\n");
	if (isset ($_GET["M"]))
	  {

	    $distanceAllowance = $_GET["M"];

	    $distanceAllowance += 0;
	    debugPrint("M is set.  Distance allowance is $distanceAllowance\n");
	    if ($distanceAllowance > 0)
	      {	
		
		if (isset ($itemList)) 
		  {
		    debugPrint("In distance allowance.  Item List is $itemList");
		    if ($itemList[0] = ',')
		      {
			$itemList = substr($itemList, 1, strlen($itemList)-1);
		      }
		    $kruskalQuery = "SET @pointList = '$itemList'; CALL LimitedKruskal(@pointList, $distanceAllowance, @length); SELECT @length as 'length', @pointList as 'pointList' ;";
		    debugPrint ($kruskalQuery . "\n");
		    debugPrint($mysqli->multi_query($kruskalQuery));
		    $rst = $mysqli->store_result();
		    if ($rst)
		      {
			debugPrint ("first result\n"); 
			debugPrint (print_r($rst, TRUE));
			$row=$rst->fetch_assoc();
			debugPrint ("CALL  Row is \n");
			debugPrint(print_r($row,TRUE));
	
		      }
		    else
		      {
			debugPrint($rst = $mysqli->next_result());
			$rst = $mysqli->store_result();
			if ($rst)
			  {
			    debugPrint ("second result\n"); 
			    debugPrint(print_r($rst, TRUE));
			    $row=$rst->fetch_assoc();
			    debugPrint ("Row is ");
			    debugPrint(print_r($row, TRUE));
			  }
			else
			  {
			    debugPrint($rst = $mysqli->next_result());
			    $rst = $mysqli->store_result();
			    if ($rst)
			      {
				debugPrint ("third result\n"); 
				debugPrint(print_r($rst, TRUE));
				$row=$rst->fetch_assoc();
				debugPrint ("Row is ");
				debugPrint(print_r($row, TRUE));
				$itemList = $row['pointList'];
				$mstLength = $row['length'];
				
				$distanceConstraint = " ( id = " .
				  str_replace("," , " or id=" , $itemList) .
				  " ) ";
				
			      }
			    else 
			      {
				debugPrint("houston.  we have a problem\n");
				die();
			      }
			  }
		      }

		  }
	      }
	      
	  }
      }
  }





$query;
 if ($doAllowance == 'Y')
 {
 	$query = "SELECT * FROM SampleData WHERE $budgetConstraint";
 }
 else if (   $doDistanceAllowance == 'Y')
   {
     $query = "SELECT * FROM SampleData WHERE $distanceConstraint";
   }
 else 
 	{
	$query = "SELECT * FROM SampleData WHERE $coordinateConstraint AND $typeConstraint AND $itemConstraint";
	}
debugPrint ("\nQUERY: $query\n");

// query for the allowance problem
// "SELECT * FROM SampleData WHERE $budgetConstraint''
//  budgetConstraint = knapsacker[i] or knapsacker [i+1]

$result = $mysqli->query($query);

if (!$result) 
  {  
    debugPrint ('Invalid query: ' . $mysqli->error);
    die('Invalid query: ' . $mysqli->error);
  } 


header("Content-type: text/xml"); 

    // Iterate through the rows, adding XML nodes for each

$pointList = "'";
debugPrint("point list is " .  $pointList);

while ($row = $result->fetch_assoc())
  {  
    // ADD TO XML DOCUMENT NODE  
    $node = $dom->createElement("marker");  
    $newnode = $parnode->appendChild($node);   

    $newnode->setAttribute("name",$row['name']);
    $newnode->setAttribute("address", $row['address']);  
    $newnode->setAttribute("lat", $row['lat']);  
    $newnode->setAttribute("lng", $row['lng']);  
    $newnode->setAttribute("type", $row['type']);
    $newnode->setAttribute("id", $row['id']);
    $newnode->setAttribute("expense", $row['expense']);
    $pointList .= $row['id'] . ',';
     } 



if (substr($pointList, strlen($pointList)-1, 1) == ",")
  {
    $pointList = substr($pointList, 0, strlen($pointList)-1);
  }
$pointList .= "'";

debugPrint("point list is " .  $pointList);
debugPrint("hello world\n");
debugPrint("Do distance allowance is " .  $doDistanceAllowance);


if ($doDistanceAllowance != 'Y')
  {
    $kruskalCalculation = "CALL kruskal($pointList, @length); SELECT @length;";
    debugPrint($kruskalCalculation . "\n");

    $res = $mysqli->multi_query($kruskalCalculation);
    debugPrint ("Res is $res"); 
    $rst = $mysqli->store_result();
    if ($rst)
      {
	debugPrint ("first result\n"); 
	debugPrint (print_r($rst, TRUE));
	$row=$rst->fetch_assoc();
	debugPrint ("CALL 1 Row is \n");
	debugPrint(print_r($row,TRUE));
      }
    else 
      {
	$rst = $mysqli->next_result();
	$rst = $mysqli->store_result();
	if ($rst)
	  {
	    debugPrint ("second result\n"); 
	    debugPrint(print_r($rst, TRUE));
	    $row=$rst->fetch_assoc();
	    debugPrint ("CALL 3 Row is ");
	    debugPrint(print_r($row, TRUE));
	    $mstLength = $row['@length'];
	  }
	else 
	  {
	    debugPrint("houston, we have another problem\n");
	  }
      }
  }

debugPrint  ("hello world again.");

$node = $dom->createElement("MST");
$newnode = $parnode->appendChild($node);   
$newnode->setAttribute("MSTlen",$mstLength);

debugPrint ("Dom is " . print_r($dom->saveXML(), TRUE));
echo $dom->saveXML();

?>

