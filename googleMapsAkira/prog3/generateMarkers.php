<?php  

require("dbinfo.php"); 

function knapsackBacktrack($allowance, $allExpenses )
{
  //  debugPrint();
}
function knapsackGreedy($allowance, $allExpenses)
{
  debugPrint("In knapsackGreedy.  Allowance is " . $allowance . 
	     "allExpenses is " . print_r($allExpenses, TRUE));
  
  
  $total=0;
  $sortedItems=array();
  $index=0;

  asort ( $allExpenses );
  debugPrint("Sorted All expenses is " . print_r($allExpenses, TRUE));

  $total = array_sum ($allExpenses);

    while ($total > $allowance)
      {
		$pMax = array_pop($allExpenses);
		$total -= $pMax;
      }


    debugPrint("In knapsackGreedy.  All Remaining Expenses is " . print_r($allExpenses, TRUE));
    debugPrint("In knapsackGreedy.  Total  is $total . Allowance is $allowance" );

    
    return $allExpenses;
	  
}




  // Let V be a set of initial points chosen for tour, 
  // allowance be an expense allowance set by user, 
  // and total be a total expense required to visit 
  // all the points in V. Let pmax be the most expensive point 
  // in V in which expense(pmax) be the exact 
  // amount of its expense. Realize the following computation:

  /*
  //1. find pmax from V,
  $V = $knapsackItems;
  $total = cost($V);
  $pmaxIndex = max($V);
  $expense = expense($pmaxIndex); 
  */
  //2.
  //if the total expense without pmax is still larger 
  // than the allowance, 
  // remove pmax from V, adjust total, and go back to 1; 
  // .. or more specifically, 
  // if total - expense(pmax) > allowance, 
  // then V ← V - { pmax }, 
  // total ← total - expense(pmax), 
  // and go back to 1,

  //3.  
  //otherwise, 
  // compute the difference, diff, 
  // between allowance and reduced total such as 
  // diff ← total - allowance,


  //4. 
  // let V' ← V - { pmax } and find the 
  // largest point p'max in the point set V' 
  // in which diff < expense(p'max) < expense(pmax),


  //5.
  // if p'max is found, remove p'max from V, 
  // that is, 
  // V ← V - { p'max }, 
  // set total ← total - price(p'max), and 
  // return the revised V and total as a solution,

  //6.
  // otherwise, 
  // compute V ← V - { pmax }, 
  // set total ← total - price(pmax), and 
  // return V and total.





 //  The algorithm is to keep removing the most costly place
 //  from the tour set. Once the total expense becomes lower
 // than the allowance, find a place in the remaining set
 // whose removal (instead of the place lastly removed) 
 // may become closer to the allowance. For instance, 
 // total expense of tour { 225, 155, 120, 75, 50 } is $625.
 // If allowance is $450, removing 225 and 155 is too much
 // but 225 and 50 based on the algorithm would approximate.
 // The best combinatorial solution is removing 120 and 75
 // (thus total becomes $430), which is generally hard
 // to derive when the number of visits increases. 
 // Also, people like us tend to avoid expensive places
 //  at first to accommodate their budget...

function debugPrint($msg)
{
  file_put_contents('php://stderr', print_r("\n$msg\n", TRUE));
}


debugPrint("in generate markers");

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");


$parnode = $dom->appendChild($node); 

// Opens a connection to a MySQL server

$connection=mysql_connect ($hostname, $username, $password);
if (!$connection) {  die('Not connected : ' . mysql_error());} 

// Set the active MySQL database

$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
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
    debugPrint("\nLatitude is " . $ctrLat . " Longditude is " . $ctrLng . "\n");
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
debugPrint ("Use tem constraints is $useItemConstraints\n");
if (($useItemConstraints == 'Y')
    || isset ($_GET["B"]))
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
		    
		    $expenseResult = mysql_query($expenseQuery);
					
		    if (!$expenseResult) 
		      {  
			die('Invalid query for EXPENSE: ' . mysql_error());
		      } 
		    
		    while ($expenseRow = @mysql_fetch_assoc($expenseResult))
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
		    debugPrint(" budget Constraint is " . $budgetConstraint);
			
		    
		  }
	      }
	      
	  }
      }
  }


debugPrint("Do allowance is $doAllowance  .  ALlowance is $allowance  ");

$query;
 if ($doAllowance == 'Y')
 {
 	$query = "SELECT * FROM SampleData WHERE $budgetConstraint";
 }   
 else 
 	{
	$query = "SELECT * FROM SampleData WHERE $coordinateConstraint AND $typeConstraint AND $itemConstraint";
	}
debugPrint ("\nQUERY: $query\n");

// query for the allowance problem
// "SELECT * FROM SampleData WHERE $budgetConstraint''
//  budgetConstraint = knapsacker[i] or knapsacker [i+1]

$result = mysql_query($query);
if (!$result) 
  {  
    die('Invalid query: ' . mysql_error());
  } 



header("Content-type: text/xml"); 

    // Iterate through the rows, adding XML nodes for each

while ($row = @mysql_fetch_assoc($result))
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
  } 

echo $dom->saveXML();

?>
