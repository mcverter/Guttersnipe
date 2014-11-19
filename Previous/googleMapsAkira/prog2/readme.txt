The webpage is viewable at 

http://css8a0.engr.ccny.cuny.edu/~vert90/prog2/index.php

This submission includes the following files:

dbinfo.php  --  Headers for my mysql connection.  Note that I will have to change this file when I install this on the CCNY Linux Lab




generateMarkers.php  -- for generating the markers on the map


index.php   -- for circular the html/php/javascript for the webpage

ThirdSample.sql -- sql for 500 database entries.

please note that i did the extra credit.  the code for this is as follows:

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


You can see this in the apache log:
QUERY: SELECT * FROM SampleData WHERE  ( lat >= 40.713903925114 and lat <= 40.757274074886 and lng >= -74.016217431026 and lng <= -73.972606568974)  AND 1 ( type=10000 )  AND 1

and 

 SELECT * FROM SampleData WHERE  ( ( (( lat - 40.735589 ) * 69.172) * (( lat - 40.735589 ) * 69.172)) +  ((( lng - -73.99441200000001 ) * 69.172 * cos(40.735589)) * (( lng - -73.99441200000001 ) * 69.172 * cos(40.735589)))) <=  (1.5 * 1.5)  AND   ( type=1  or  type=2  or  type=3 ) AND 1


However, this may not be easily visible on a test unless one knows the exact coordinates of every point in the database
