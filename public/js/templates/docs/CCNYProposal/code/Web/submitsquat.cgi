#!/usr/bin/perl

use CGI qw (:standard) ;
use CGI::Carp qw(fatalsToBrowser);
use DB_File;
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

my $mycgi = new CGI;
my @fields = $mycgi->param;

print header, start_html('Property report submitted');

my $number = $mycgi->param('number');
my $street = $mycgi->param('street');
my $suffix = $mycgi->param('suffix');
my $city = $mycgi->param('city');
my $state = $mycgi->param('state');
if ($state eq "DC") {
    $city = "DC";
}
my $t = time;
my $key = "$state~$city~$suffix~$street~$number~$t";
my $value = $mycgi->param('comments') | " ";

print "<h1><center>Property report submitted</center></h1><p>\n";
print "<h3>You have submitted the following information for the address</h3><p>\n";
print "$number $street $suffix<br>\n";
print "$city, $state<br>\n";
print "---------------------------------------<br>\n";
print "$value<br>\n";

&printLinks; 


my %dbhash;
tie %dbhash, 'DB_File', "properties.db", O_RDWR|O_CREAT, 0644, $DB_BTREE or die  ("could not open file");
$dbhash{$key} = $value;
untie %dbhash;

print end_html;









