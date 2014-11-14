#!/usr/bin/perl

use CGI qw (:standard) ;

BEGIN {
use CGI::Carp qw(carpout fatalsToBrowser);
open (LOG, ">>server.err");
carpout (*LOG);
}

my 
(
$whenMove,
$newTenancy,
$currentRentAmount,
$currentRentDate,
$rentPaidTo,

$increaseDate_1,
$increaseAmount_1,
$reason_1,
$evidence_1,

$increaseDate_2,
$increaseAmount_2,
$reason_2,
$evidence_2,
);


    my $dateForm = <<HERE;
    <form>
    <select name=month>
    <OPTION value="January">January
    <OPTION value="February">February
    <OPTION value="March">March
    <OPTION value="May">May
    <OPTION value="June">June
    <OPTION value="July">July
    <OPTION value="August">August
    <OPTION value="September">September
    <OPTION value="October">October
    <OPTION value="November">November
    <OPTION value="December">December
    </select>
    </td>
    
    <td>
    <select name="day">
    <OPTION value="1">1
    <OPTION selected value="2">2
    <OPTION value="3">3
    <OPTION value="4">4
    <OPTION value="5">5
    <OPTION value="6">6
    <OPTION value="7">7
    <OPTION value="8">8
    <OPTION value="9">9
    <OPTION value="10">10
    <OPTION value="11">11
    <OPTION value="12">12
    <OPTION value="13">13
    <OPTION value="14">14
    <OPTION value="15">15
    <OPTION value="16">16
    <OPTION value="17">17
    <OPTION value="18">18
    <OPTION value="19">19
    <OPTION value="20">20
    <OPTION value="21">21
    <OPTION value="22">22
    <OPTION value="23">23
    <OPTION value="24">24
    <OPTION value="25">25
    <OPTION value="26">26
    <OPTION value="27">27
    <OPTION value="28">28
    <OPTION value="29">29
    <OPTION value="30">30
    <OPTION value="31">31
    </select>
    </td>
    
    <td>
    <select name="year">
    <OPTION value="1970">1970
    <OPTION value="1971">1971
    <OPTION value="1972">1972
    <OPTION value="1973">1973
    <OPTION value="1974">1974
    <OPTION value="1975">1975
    <OPTION value="1976">1976
    <OPTION value="1977">1977
    <OPTION value="1978">1978
    <OPTION value="1979">1979
    <OPTION value="1980">1980
    <OPTION value="1981">1981
    <OPTION value="1982">1982
    <OPTION value="1983">1983
    <OPTION value="1984">1984
    <OPTION value="1985">1985
    <OPTION value="1986">1986
    <OPTION value="1987">1987
    <OPTION value="1988">1988
    <OPTION value="1989">1989
    <OPTION value="1990">1990
    <OPTION value="1991">1991
    <OPTION value="1992">1992
    <OPTION value="1993">1993
    <OPTION value="1994">1994
    <OPTION value="1995">1995
    <OPTION value="1996">1996
    <OPTION value="1997">1997
    <OPTION value="1998">1998
    <OPTION value="1999">1999
    <OPTION value="2000">2000
    <OPTION value="2001">2001
    <OPTION value="2002">2002
    <OPTION value="2003">2003
    <OPTION value="2004">2004
    </select>
    </td>
    
HERE


sub runStage_1 {
    print <<"====";
<p> When did you move in to your apartment?</p>
    $dateForm
====
}

sub runStage_2{ 
    print <<"====";
    <p> Did establish a new tenancy or <br>
	did you move into an existing tenancy?</p>
	<form>
	<select>
	<option value="y">New
	<option value="n">Existing
	</select>
	</form>
====
}

sub runStage_2.5 {
}

sub runStage_3{
    print <<"====";
    <p>What is the current rent of the unit?</p>
====
}
sub runStage_4{
print <<"===="
    When did it start to be this much?
====
}

sub runStage_5{

print <<"===="
<p>Do you pay your rent to the owner of the unit, <br>
to the property manager, <br>
or to the master tenant</p>
 
	<form>
	<select>
	<option value="owner">Owner
	<option value="property">Property Manager
	<option value="tenant">Master Tenant
	</select>
	</form>
====
}


print header, start_html('Property Search Results');
$mycgi = new CGI;

&runStage_1;
print end_html;

