#!/usr/bin/perl

use CGI qw (:standard) ;
use CGI::Carp qw(fatalsToBrowser);
use DB_File;
use LWP::Simple;
use URI::Escape;
use Data::Dumper;
use strict;
use warnings;

sub printLinks {

    print <<"====";
<h3>LINKS</h3><p>
<p>
<a href="main.htm">W.A.S.T.E. squat, want squat main page</a><p>
<a href="report.htm">Report another vacant properties</a><p>
<a href="research.htm">Find vacant properties</a><p>
<a href="maps.htm">Look at maps</a><p>
<a href="kropotkin_dwelling.htm">Read Kropotkin's thoughts on this project</a><p>
<p>
====

}

sub getCoordinates
{
    my $location =  shift;
#"1328 Halsey Street, Brooklyn, NY, 11237";
my $addr = uri_escape($location);
my @result = get ("http://rpc.geocoder.us/service/csv?address=$addr");
my $result = join ",", @result;
}

my $mycgi = new CGI;
my @fields = $mycgi->param;
my $number = $mycgi->param('number');
my $street = $mycgi->param('street');
my $suffix = $mycgi->param('suffix');
my $zip = $mycgi->param('zip');
my $comments = $mycgi->param('comments') | " ";


my $address = "$number $street $suffix $zip";
my @coordinates = split /,/, getCoordinates($address);


print header;

print <<"====";


<html>
<head>
<title> Property Report Submittted </title>
    <script src="http://maps.google.com/maps?file=api&v=1&key=ABQIAAAA_z1QXugqHBUWWuMOTBSKPRTqngs0132BOZbMpdaTTz9bM5WHkxScr0UED-Pio9mKVcakbWneFXnHfw" type="text/javascript"></script>


    <script type="text/javascript">
    //<![CDATA[

    function onLoad() {

      var map = new GMap(document.getElementById("map"));
      map.addControl(new GSmallMapControl());
      map.addControl(new GMapTypeControl());
      var point = new GPoint($coordinates[1],$coordinates[0]);
      map.centerAndZoom(point , 1);
      var bounds = map.getBoundsLatLng ();
      var marker = new GMarker(point);
      map.addOverlay(marker);
      marker.openInfoWindowHtml("$comments");
      window.setTimeout(function() { map.recenterOrPanToLatLng(point);},
			2000);
    }

    //]]>
    </script>

</head>
  <body onload="onLoad()">
    <div id="map" style="width: 500px; height: 300px"></div>

====
#@result <p>
#$result[0]

print "<h1><center>Property report submitted</center></h1><p>\n";
print "<h3>You have submitted the following information for the address</h3><p>\n";
print "$number $street $suffix<br>\n";
print "$zip<br>\n";
print "---------------------------------------<br>\n";
print "$comments<br>\n";

&printLinks; 




print end_html;









