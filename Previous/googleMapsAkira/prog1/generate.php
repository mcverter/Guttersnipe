<?php

$LatLng_process_order = 1;
$LatLng_cached_math = array();

function debugPrint($msg)
{
  file_put_contents('php://stderr', print_r($msg, TRUE)); 
}


// returns random number with flat distribution from 0 to 1
function random_0_1() 
{
  return (float)rand()/(float)getrandmax();
}


// returns random number with normal distribution:
// mean=0  std dev=1
function gauss() 
{ 
  $x=random_0_1();
  $y=random_0_1();
  
  $u=sqrt(-2*log($x))*cos(2*pi()*$y);
  return $u;
}


// returns random number with normal distribution:
function gauss_ms($m=0.0,$s=1.0) 
{ 
  return gauss()*$s+$m;
}

function checkBoundaries($maxVal, $center, $spread)
{
  if ( !isset ($center) || 
       !isset ($spread))    // it's okay if either or both = 0, though
    return false;

  $top = $center + $spread;
  $bottom = $center - $spread;


  if ((abs($top) > $maxVal) ||
      (abs($bottom) > $maxVal))
    return false;
  else
    return true;
}


function generateNormalDistribution($base, $spread)
{
  return gauss_ms ($base, $spread);
}

function generateUniformDistribution($base, $spread)
{
  $max = $base + $spread;
  $min = $base - $spread;

  if ($max < $min)
    {
      $temp = $max;
      $max = $min;
      $min = $temp;
    }

  $decimalPlaces = 5;

  $max = $max * (pow(10, $decimalPlaces));
  $min = $min * (pow(10, $decimalPlaces));
  $divisor = pow(10, $decimalPlaces);
  return (mt_rand($min, $max))/$divisor;
}


function generateCircularDistribution($lat, $lng, $latSpread, $lngSpread)
 {
   debugPrint ("lat $lat, lng $lng, latSpread $latSpread, lngSpread $lngSpread");
   $randomAngle = 2 *  M_PI * random_0_1() ;
   $randomLat = $lat + (sin($randomAngle) * $latSpread);
   $randomLng = $lng + (cos($randomAngle) * $lngSpread);
     
   return "$randomLat, $randomLng";
 }


function LatLng_get_template_options($postdata, $col, $num_cols)
{
  global $LatLng_cached_math;

  $lat = $lng = false;

  if (isset($postdata["includeLat_$col"])) 
    {
      $lat = true;
    }
    
  if  (! empty($postdata["includeLng_$col"]))
    {
      $lng = true;
    }
  
  if (!$lng && !$lat)
    {
      return false;
    }
  
  $conversionConstant = 69.172;

  $latBase;
  $latSpread; 
  $latDistanceMiles;
  $lngBase; 
  $lngSpread;
  $lngDistanceMiles;


  if ($lat)
    {
      $latBase =  $postdata["latBase_$col"];
      $latDistanceMiles = $postdata["latDistance_$col"];
      $latSpread = $latDistanceMiles / $conversionConstant;
     
      if (!checkBoundaries(90, $latBase, $latSpread))
	{
	  return false;
	} 
    }

  if ($lng)
    {
      $lngBase  =  $postdata["lngBase_$col"];
      $lngDistanceMiles = $postdata["lngDistance_$col"];

      $lngSpread = $lngDistanceMiles / ($conversionConstant * cos((double)$latBase));  
 
      if ((! checkBoundaries(180, $lngBase, $lngSpread)))
	{
	  return false;
	}
    }

  $distro =  $postdata["distro_$col"];
  
  // circular must have a center and a consistent radius
  if (($distro == "CIR")) 
    {
      if (!$lat || !$lng ||
	  ($latDistanceMiles != $lngDistanceMiles))
	return false;  //
    }


  $options = array(
		   "lat" => $lat,    
		   "lng" => $lng,
		   "distro" => $distro
  );

  $LatLng_cached_math = array(
    "latBase" => $latBase,
    "latSpread" => $latSpread,
    "lngBase" => $lngBase,
    "lngSpread" => $lngSpread
  );

  return $options;
}


function LatLng_generate_item($row, $options, $existing_row_data)
{
  global $LatLng_cached_math;

  $latBase = $LatLng_cached_math["latBase"];
  $latSpread = $LatLng_cached_math["latSpread"];

  $lngBase = $LatLng_cached_math["lngBase"];
  $lngSpread = $LatLng_cached_math["lngSpread"];
  
  $info = array();

  if ($options["distro"] == "MAX")
    {
      if ($options["lat"] && $options["lng"])
	{
	  $info[] =  generateUniformDistribution( $latBase , $latSpread);
	  $info[] =  generateUniformDistribution( $lngBase , $lngSpread);
	}
      else if ($options["lat"])
	{
	  $info[] =  generateUniformDistribution( $latBase , $latSpread);
	}
      else if ($options["lng"])
	{
	  $info[] =  generateUniformDistribution( $lngBase, $lngSpread);
	}
    }
    else if ($options["distro"] == "STD")
      {
      if ($options["lat"] && $options["lng"])
	{
	  $info[] =  generateNormalDistribution ( $latBase , $latSpread);
	  $info[] = generateNormalDistribution( $lngBase, $lngSpread);
	}
      else if ($options["lat"])
	{
	  $info[] =  generateNormalDistribution( $latBase , $latSpread);
	}
      else if ($options["lng"])
	{
	  $info[] = generateNormalDistribution( $lngBase, $lngSpread);
	}
      }
    else if ($options["distro"] == "CIR")
      {
	$info[] = generateCircularDistribution( $latBase, $lngBase, 
					      $latSpread, $lngSpread);
      }

  return join(", ", $info);
}


function LatLng_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(30) default NULL";
      else
        $info = "varchar2(30) default NULL";
  	  break;
  }

  return $info;
}
