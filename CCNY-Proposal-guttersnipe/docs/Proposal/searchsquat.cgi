#!/usr/bin/perl

use CGI qw (:standard) ;
use DB_File;

BEGIN {
use CGI::Carp qw(carpout fatalsToBrowser);
open (LOG, ">>server.err");
carpout (*LOG);
}

sub printLinks {

    print <<"====";
<a name="#links"><h3>Links</h3></a><p>
<p>
<a href="research.html">Find another vacant properties</a><p>
<p>
<a href="main.html">W.A.S.T.E. squat, want squat main page</a><p>
<a href="report.html">Report vacant properties</a><p>
<a href="maps.html">Look at maps</a><p>
<a href="kropotkin_dwelling.html">Read Kropotkin's thoughts on this project</a><p>
<p>
====
}


sub getKey {
    # get parameters from the cgi object 

    my $number = $mycgi->param('number');
    my $street = $mycgi->param('street');
    my $suffix = $mycgi->param('suffix');
    my $city = $mycgi->param('city');
    my $state = $mycgi->param('state');
   
    # construct the key from as much data as possible
    my $key;
    if ($state) {
	$key = "$state~";
	if ($state eq "DC") {
	    $city = "DC";
	}
	    
	if ($city) {
	    $key .= "$city~";
	    if ($street) {
		$key .= "$suffix~";
		$key .= "$street~";
		if ($number) {
		    $key .= "$number~";
		}
	    }
	}
    }
    return $key;
}

sub parseDate {
    my $rawtime = shift;
    return localtime $rawtime;
}

sub parseAddress {
    my $rawaddress = shift;
    my @temp = split /~/ , $rawaddress;
    return "$temp[4] $temp[3] $temp[2]; $temp[1], $temp[0]"; 
}
sub retrieveAddresses { 
    my $key = shift;
    my $tempkey = $key;    

    my ($value, $date, $nextaddress);
    my $address = 0;
    my $arraycnt = -1;
    my @temp;

    my $ptr;
    for ($ptr = $pointer->seq($tempkey, $value, R_CURSOR);
	 $tempkey =~ $key && $ptr == 0;
	 $ptr = $pointer->seq($tempkey, $value, R_NEXT)) {
	@temp = split /~/, $tempkey;
	$date = pop @temp;
	$nextaddress = join '~', @temp;

	if ($nextaddress ne $address) {
	    $address = $nextaddress;
	    $addresses[++$arraycnt] = [$address, $date, $value];
	}
	else {
	    push @{$addresses[$arraycnt]}, $date, $value;
	}
	
    }
}

sub printAddresses {
    if (! scalar @addresses) {
	print "<h3>Sorry, no results were found\n</h3><p>\n";
    }
    else {
	 
	print "<a name=\"top\"> <center><h1> Property Search Results </h1></center><p></a>\n";
	print "<ol>\n";
	for (my $i = 0; $i < scalar @addresses; $i++) {
	    my $add = &parseAddress($addresses[$i][0]);
	    print "<li><a href=\"#address$i\">$add</a></li>\n";
	}
	print "<li><a href=\"#links\">Links</a></li>\n";
	print "</ol>";
	for (my $i = 0; $i < scalar @addresses; $i++) {
	    my $daa = &parseAddress($addresses[$i][0]);
	    print "<H2><a name=\"address$i\">$daa</a></H2><p>\n";
	    for (my $j = 1; $j < scalar @{ $addresses[$i]}; ) { 
		my $date = &parseDate($addresses[$i][$j++]);
		print "<b>Submitted on $date:<p></b>\n";
		print "$addresses[$i][$j++]<p>\n";
	    }
	    print "<a href=\"#top\">Back to top</a><p>";
	}
	printLinks; 
	print "<a href=\"#top\">Back to top</a><p>";
    }
}


#######################################
#
#
#  main
#
#
############################################

print header, start_html('Property Search Results');
$mycgi = new CGI;
$key = &getKey();

@addresses;
%dbhash;

pointer;
$pointer = tie %dbhash, 'DB_File', "properties.db", O_RDWR|O_CREAT, 0644, $DB_BTREE or die  ("could not open file");
&retrieveAddresses ($key);
&printAddresses;

untie %dbhash;
print end_html;
































