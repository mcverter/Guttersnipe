<?php  

require("dbinfo.php"); 

function debugPrint($msg)
{
  file_put_contents('php://stderr', print_r($msg, TRUE));
}


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
    $pattern = "/(.*),(.*)/";
    preg_match( $pattern, $center, $regs);
    $ctrLat = $regs[1];
    $ctrLng = $regs[2];
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

if (isset ($_GET["Z"]))
  {
    $useItemConstraints = $_GET["Z"];
  }

if ($useItemConstraints == 'Y')
  {
    if ((isset($_GET["F"])) 
	&& (!empty($_GET["F"]))) 
      {
	$itemList = $_GET["F"];
	
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

$query = "SELECT * FROM SampleData WHERE $coordinateConstraint AND $typeConstraint AND $itemConstraint";
debugPrint ("\nQUERY: $query\n");

$result = mysql_query($query);
if (!$result) {  
  die('Invalid query: ' . mysql_error());
} 



header("Content-type: text/xml"); 

// Iterate through the rows, adding XML nodes for each

while ($row = @mysql_fetch_assoc($result)){  
  // ADD TO XML DOCUMENT NODE  
  $node = $dom->createElement("marker");  
  $newnode = $parnode->appendChild($node);   
  $newnode->setAttribute("name",$row['name']);
  $newnode->setAttribute("address", $row['address']);  
  $newnode->setAttribute("lat", $row['lat']);  
  $newnode->setAttribute("lng", $row['lng']);  
  $newnode->setAttribute("type", $row['type']);
  $newnode->setAttribute("id", $row['id']);
} 

echo $dom->saveXML();

?>
