<!DOCTYPE html >


  <head>
<?php

 
function debugPrint($msg)
{
  file_put_contents('php://stderr', print_r($msg, TRUE));
}


$processRefines="N";

if (isset($_POST["Refine"]))
  {
    $processRefines="Y";
  }

//*********************************
//
// Process all the POST variables
//
//*********************************

//*********************************
//
// Process CIRCULAR checkbox
//
//*********************************


$circ = "N";
if (isset($_POST["circular"]))
  {
    $circ="Y";
  }


//*********************************
//
// Process REFINEMENT checkboxes
//
//*********************************

$allRefines = "";
if (isset($_POST["refines"]))
{
    $refines = $_POST["refines"]; 
    $R = count($refines);
    for ($i=0; $i<$R; $i++)
      {
	  $allRefines .= "," . $refines[$i];
      }
}


//*********************************
//
// Process TYPES checkboxes
//
//*********************************

$allTypes = "";
if (isset($_POST["siteType"]))
  {
    $types = $_POST["siteType"]; 
    $N = count($types);
    for ($i=0; $i<$N; $i++)
      {
	$selectedType = $types[$i];

	if (strcmp($selectedType, "museum") == 0) 
	  {
	    $allTypes .= ",1";
	  }
	else if (strcmp($selectedType, "historic_site") == 0) 
	  {
	    $allTypes .= ",2";
	  }
	else if (strcmp($selectedType, "information") == 0) 
	  {
	    $allTypes .= ",3";
	  }
	else if (strcmp($selectedType, "eatery") == 0) 
	  {
	    $allTypes .= ",4";
	  }
	else if (strcmp($selectedType, "shop") == 0) 
	  {
	    $allTypes .= ",5";
	  }
      }
  }



//*********************************
//
// Process CENTER textbox
//
//*********************************

$ctr;
if ((isset($_POST["center"])) 
    && (!empty($_POST["center"]))) 
  {
    $ctr = $_POST["center"];
  }
else
  { // default center
    $ctr = "Central Park, Manhattan, New York, NY";
  }


//*********************************
//
// Process ZOOM dropdown
//
//*********************************

$zuzu;
$zoomSelect;
if (isset($_POST["zoom"]))
  {
    $zuzu = $_POST["zoom"];
    switch ($zuzu)
      {
      case '12' :
	$zoomSelect = 0;
	break;
      case '14' :
	$zoomSelect = 1;
	break;
      case '16' :
	$zoomSelect = 2;
	break;
      }
  }
else
  {
    $zuzu = 14;
    $zoomSelect = 1;
  }

//*********************************
//
// Process SIZE dropdown
//
//*********************************

$sooz;
$sizeSelect;
$mapDimension;
if (isset($_POST["size"]))
  {
    $sooz = $_POST["size"];
    switch ($sooz)
      {
      case 'l' :
	$sizeSelect = 0;
	$mapDimension = 800;
	break;
      case 'm' :
	$sizeSelect = 1;
	$mapDimension = 600;
	break;
      case 's' :
	$sizeSelect = 2;
	$mapDimension = 400;
	break;
      }
    
  }
else
  {
    $sooz = 'm';
    $sizeSelect = 1;
    $mapDimension = 600;
  }


//*********************************
//
// Process RADIUS dropdown
//
//*********************************

$rootius;
$radiusSelect;
if (isset($_POST["radius"]))
  {
    $rootius = $_POST["radius"];
    switch ($rootius)
      {
      case '0.5' :
	$radiusSelect = 0;
	break;
      case '1.0' :
	$radiusSelect = 1;
	break;
      case '1.5' :
	$radiusSelect = 2;
	break;
      case '2.0' :
	$radiusSelect = 3;
	break;
      case '2.5' :
	$radiusSelect =4;
	break;
      }


  }
else
  {
    $rootius = 1.5;
    $radiusSelect = 2;
  }


//*********************************
//
// Set arguments for downloadURL.php
//
//*********************************

$downloadURLArgs = "R=" . $rootius . "&T=" . $allTypes . "&F=" . $allRefines . "&O=" . $circ . "&Z=" . $processRefines ; 


?>



    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
     <title>WELCOME TO SCENIC MANHATTAN!!!</title>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">
    //<![CDATA[ 


    var customIcons = {
      museum: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
      historic_site: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
      information: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_yellow.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
      eatery: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
      shop: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_purple.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      }
    };


    function drawMap() {
	var geocoder = new google.maps.Geocoder();
	var map;
	var ctr = "<?php echo $ctr ?>";
	var map = new google.maps.Map(document.getElementById("map"), {
	    center: new google.maps.LatLng(40.769700, -73.973500),
	    zoom: <?php echo $zuzu ?>,
	    mapTypeId: 'roadmap'
	});

	var mooCenter;
	
	geocoder.geocode( 
	    { 'address': ctr}, 
	    function(results, status) 
	    {
	      //
	      // geocode center text argument
	      //
		if (status == google.maps.GeocoderStatus.OK) 
		{
		    map.setCenter(results[0].geometry.location);
		    
		    mooCenter = map.center.toString();
		} 
		else 
		{
		    alert ("Geocoding Error!  Setting center to Central Park, NY");
		    map.setCenter(new google.maps.LatLng(40.769700, -73.973500));
		}

		
		var infoWindow = new google.maps.InfoWindow;


		//
		// for holding HTML for dynamically created refinement checkboxes
		// 
		var refinementHTML;


		var centerGET = map.center.toString().replace(/[\)\(\s]/g,'');		
		var GET_arg = "C=" + centerGET + "&" + "<?php echo $downloadURLArgs ?>";

		downloadUrl("generateMarkers.php?" + GET_arg, function(data) {
		    var xml = data.responseXML;
		    var markers = xml.documentElement.getElementsByTagName("marker");
		
		    refinementHTML = "<table>\n\t<tr> <b> <td> select </td> <td> id </td> <td> name </td> </b></tr>\n";    
		    
		    for (var i = 0; i < markers.length; i++) {
			var name = markers[i].getAttribute("name");
			var address = markers[i].getAttribute("address");
			var type = markers[i].getAttribute("type");
			var id =  markers[i].getAttribute("id");

			var point = new google.maps.LatLng(
			    parseFloat(markers[i].getAttribute("lat")),
			    parseFloat(markers[i].getAttribute("lng")));
			var html = "<b>" + name + "</b> <br/>" + address;
			var icon = customIcons[type] || {};
			var marker = new google.maps.Marker({
			    map: map,
			    position: point,
			    icon: icon.icon,
			    shadow: icon.shadow
			});
			
			bindInfoWindow(marker, map, infoWindow, html);


			//
			// adding dynamic HTML for refinement checkboxes
			//
			var rowData = " ";
			rowData += "\t\t <tr> <td>  <input id=\"refines[]\" name=\"refines[]\" type=\"checkbox\" checked=\"checked\" value=\"";
			rowData += id;
			rowData +="\" /></td>  <td> "
			rowData += id;
			rowData += " </td> <td> "
			rowData += name;
			rowData += " </td> </tr> \n";
			refinementHTML += rowData;
		    }
		    
		    //
		    // add refinement checkboxes dynamically
		    // 
		    refinementHTML += "\t\n</table>\n<br />\n<p>\n<input type=\"submit\" name=\"Refine\" value=\"Refine\" /> \n</p>";
		    document.getElementById('refinementPanel').innerHTML = refinementHTML;
		    
		});
		
	    }
	);
    }

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('POST', url, true);
      request.send(null);
    }

    function doNothing() {}

    //]]>

  </script>

  </head>

  <body onload="drawMap()">



<!-- <div id="inputForm"> -->

  <form name="mapInputs" action="index.php" method="POST">
    
    <p>
      <label>Roadmap size:
	<select name = "size" id="size">
	  <option value="l">large:800x800</option>
	  <option value="m">medium:600x600</option>
	  <option value="s">small:400x400</option>
	</select>
      </label>
<script type="text/javascript">
document.getElementById("size").selectedIndex = <?php echo $sizeSelect ?>;
</script>

      
      
      <label>Initial zoom:
	<select name = "zoom" id="zoom">
	  <option value="12">wide:12</option>
	  <option value="14">medium:14</option>
	  <option value="16">narrow:16</option>
	</select>
      </label>
    </p>
<script type="text/javascript">
document.getElementById("zoom").selectedIndex = <?php echo $zoomSelect ?>;
</script>



    <p>
      <label>Central address: <br />
	<input name = "center" type="text" size="150" 
    <?php 
if ((isset($_POST["center"])) && (!empty($_POST["center"])))
{ echo "value=\"" . $_POST["center"] . "\"";}

    ?>
      </label>
      
      <br />
      
      <label>Surrounded by:
	<select name = "radius" id="radius">
	  <option value="0.5">0.5 mile</option>
	  <option value="1.0">1.0 mile</option>
	  <option value="1.5">1.5 mile</option>
      <option value="2.0">2.0 mile</option>
    <option value="2.5">2.5 mile</option>
	</select>
      </label>
      <label> Circular: 
        <input id="circular" name="circular" type="checkbox" 
<?php if (isset($_POST["circular"])) { echo "checked=\"checked\"";} ?> 
/>
      </label>
    </p>
<script type="text/javascript">
document.getElementById("radius").selectedIndex = <?php echo $radiusSelect ?>;
</script>
    
    <p>
      <label>Types: <br />
	<label> museum
	  <input id="siteType[]" name="siteType[]" type="checkbox" value="museum" 
		 <?php if (preg_match("/1/", $allTypes)) { echo "checked=\"checked\"";} ?> 
		 />
	</label>
	
	<label> historic_site
	  <input id="siteType[]" name="siteType[]" type="checkbox" value="historic_site" 
		 <?php if (preg_match("/2/", $allTypes)) { echo "checked=\"checked\"";} ?> 
		 />
	</label>
	
	<label> information
	  <input  id="siteType[]" name="siteType[]" type="checkbox" value="information" 
		  <?php if (preg_match("/3/", $allTypes)) { echo "checked=\"checked\"";} ?> 
		  /> 
	</label>

	<label> shop
	  <input  id="siteType[]"  name="siteType[]" type="checkbox" value="shop" 
		  <?php if (preg_match("/4/", $allTypes)) { echo "checked=\"checked\"";} ?> 
		  />
	</label>

	<label> eatery
	  <input  id="siteType[]"  name="siteType[]" type="checkbox" value="eatery" 
		  <?php if (preg_match("/4/", $allTypes)) { echo "checked=\"checked\"";} ?> 
		  />
	</label>
      </label>
    </p>

    <p>
      <input type="submit" name="Submit" value="Submit" />
    </p>


<div id="title_bar">
<h1> Search Result </h1>
<table>
<tr> <td><img src="http://labs.google.com/ridefinder/images/mm_20_blue.png" /> </td> <td> museum</td> </tr>
<tr> <td><img src='http://labs.google.com/ridefinder/images/mm_20_red.png' /> </td> <td> historic_site</td> </tr>
<tr> <td><img src='http://labs.google.com/ridefinder/images/mm_20_yellow.png' /> </td> <td> information</td> </tr>
<tr> <td><img src='http://labs.google.com/ridefinder/images/mm_20_green.png' /> </td> <td> eatery</td> </tr>
<tr> <td><img src='http://labs.google.com/ridefinder/images/mm_20_purple.png' /> </td> <td> shop</td> </tr>
</table>


</div>


</div>

    <div id="map" style="width: <?php echo $mapDimension ?>px; height: <?php echo $mapDimension ?>px"></div>


    <div id="refinementPanel">

    </div>


</form>

  </body>



</html>
