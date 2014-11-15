#!/usr/bin/perl

use CGI qw (:standard) ;
use DB_File;
use strict;

BEGIN {
    use CGI::Carp qw(carpout fatalsToBrowser);
    open (LOG, ">>server.err");
    carpout (*LOG);
}


my 
(
 $stage,
 $moveDate,
 $newTenancy,
 $firstTenantDate,
 $initialRent,
$initialEvidence,
 $currRent,
 $currDate,
 $toWhom,
 $increaseDateList,
 $increaseAmountList,
 $increaseRentList,
 $increaseReasonList,
 $increaseEvidenceList,
 );

sub printHiddenMD { print "    <input type=\"hidden\" name=moveDate value=\"$moveDate\">\n";}
sub printHiddenNT { print "    <input type=\"hidden\" name=newTenancy value=\"$newTenancy\">\n";}
sub printHiddenFTD { print "    <input type=\"hidden\" name=firstTenantDate value=\"$firstTenantDate\">\n";}
sub printHiddenIR { print "    <input type=\"hidden\" name=initialRent value=\"$initialRent\">\n";}
sub printHiddenIE { print "    <input type=\"hidden\" name=initialEvidence value=\"$initialEvidence\">\n";}
sub printHiddenCR { print "    <input type=\"hidden\" name=currRent value=\"$currRent\">\n";}
sub printHiddenCD { print "    <input type=\"hidden\" name=currDate value=\"$currDate\">\n";}
sub printHiddenTW { print "    <input type=\"hidden\" name=toWhom value=\"$toWhom\">\n";}
sub printHiddenIDL { print "    <input type=\"hidden\" name=increaseDateList value=\"$increaseDateList\">\n";}
sub printHiddenIAL { print "    <input type=\"hidden\" name=increaseAmountList value=\"$increaseAmountList\">\n";}
sub printHiddenIRL { print "    <input type=\"hidden\" name=increaseRentList value=\"$increaseRentList\">\n";}
sub printHiddenIRZL { print "    <input type=\"hidden\" name=increaseReasonList value=\"$increaseReasonList\">\n";}
sub printHiddenIEL { print "    <input type=\"hidden\" name=increaseEvidenceList value=\"$increaseEvidenceList\">\n";}
sub printq2Hiddens 
{
    &printHiddenMD;
    &printHiddenNT;
}
sub printq4Hiddens
{
    &printq2Hiddens;
    &printHiddenFTD;
    &printHiddenIR;
    &printHiddenIE;
}
sub printP_T_W_Hiddens
{
    &printq4Hiddens;
    &printHiddenCD; 
    &printHiddenCR;
}
sub printB_I_L_Hiddens
{
    &printP_T_W_Hiddens;
    &printHiddenTW;
    &printHiddenIDL;
    &printHiddenIAL;
    &printHiddenIRL;
    &printHiddenIRZL;
    &printHiddenIEL;
}
    my $dateSelect = <<"HERE";
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
    <OPTION value="2">2
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
<!---
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
 --->
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


sub question_1 {
    print <<"====";

    <form action="moo.cgi" method=POST>
<p> <h2>When did you move in to your apartment?</h2></p>
    <input type="hidden" name="stage" value="1" >
    $dateSelect

    <p><h2> Did establish a new tenancy or <br>
	did you move into an existing tenancy?</h2></p>
	<select name="newTenancy">
	<option value="y">New
	<option value="n">Existing
	</select>
<br><br>
    <input type=submit value="SUBMIT">
	</form>

====
}

sub question_2{ 
    print <<"====";
    <p><h2>What was the rent when you moved in on $moveDate?</h2></p>
    <form action="moo.cgi" method=POST>
    <input type="hidden" name="stage" value="2" >
====

&printq2Hiddens;

    print <<"====";
    <input type="text" length=6 name="initialRent">

    <br>
<p><h2>Are you attaching evidence that the rent was this much?</h2></p>
	<select name="initialEvidence">
	<option value="y">Yes
	<option value="n">No
	</select>
<br><br>
    <input type=submit value="SUBMIT">
    </form>
====
}
sub question_3{
    print <<"====";
    <form action="moo.cgi" method=POST>
    <input type="hidden" name="stage" value="3" >
====
&printq2Hiddens;

    print <<"====";
    <p><h2>When did the first tenant move in?</h2></p>
	$dateSelect
	<p><h2>What was the initial rent for the first tenant?</h2></p>
    <input type="text" length=6 name="initialRent">
   <p><h2>Are you attaching evidence that the rent was this much?</h2></p>
	<select name="initialEvidence">
	<option value="y">Yes
	<option value="n">No
	</select>
<br><br>
     <input type=submit value="SUBMIT">
    </form>
====
}

sub question_4{
    print <<"====";
    <form action="moo.cgi" method=POST>
    <p><h2>What is the current rent of the unit?</h2></p>
====

    &printq4Hiddens   ; 

    print <<"====";
    <input type="hidden" name="stage" value="4" >
    <input type="text" length=6 name="currRent">
    <br>
<p><h2>    When did it start to be this much?</h2></p>
       $dateSelect
<br><br>
    <input type=submit value="SUBMIT">
    </form>
====
}

sub payToWhom{

    print <<"====";
<p><h2>Do you pay your rent to the owner of the unit, <br>
to the property manager, <br>
or to the master tenant</h2></p>
 
<form action="moo.cgi" method=POST>
    <input type="hidden" name="stage" value="PTW" >
====

    &printP_T_W_Hiddens;    

    print <<"====";
            
<select name="toWhom">
	<option value="owner">Owner
	<option value="property">Property Manager
	<option value="tenant">Master Tenant
	</select>
<br><br>
    <input type=submit value="SUBMIT">

	</form>
====
}


sub build_increase_list
{

    print <<"====";
<center><p><h1>INSTRUCTIONS</h1></p></center>
<ul>
====
if ($newTenancy eq "y")
{
    print "<li>You will now be listing the all rent increases (since April 1981) since you occupied the unit. </li>\n";
}
else 
{
    print "<li>You will now be listing the rent increases for the unit. List all prior rent increases (since April 1981) for the tenancy, even if the increases occurred prior to your occupancy.</li>\n";
}

if ($toWhom eq "tenant")
{
    print "<li> Please list your share of the total rent for the rental unit</li>\n";
}
else 
{
    print "<li>Please list the rent for the entire rental unit</li>\n";
}
    print <<"====";
<li>If there was more than one reason for a rent increase on the same date, <u>please list each increase amount as a separate increase amount</u></li>
<li>Please give information about  the first rent increase (after move-in rent) <u>first</u>.  List the most recent rent increase <u>last</u></li>
</ul>
<br>
<form action="moo.cgi" method=POST>
    <input type="hidden" name="stage" value="BIL" >
====

&printB_I_L_Hiddens;

    print <<"====";

<p><h2>When did the rent increase take effect?</h2></p>
$dateSelect

<br>
<p><h2>By how much was it increased?</h2></p>
    <input type="text" length=6 name="increment">

<br>
<p><h2>What was the new rent?</h2></p>
    <input type="text" length=6 name="newRent">

<br>
<p><h2>What was the reason given for the increase?</h2></p>
<select name=reason>
<OPTION value="Annual/Banked">Annual/Banked        
<OPTION value="Additional HS">Additional Housing Service       
<OPTION value="Capital Imp">Capital Improvements       
<OPTION value="Operate/Main">Operating & Maintenance Costs
<OPTION value="Prop I">Prop I Past Rent History     
<OPTION value="Comprable">Comparable Rents    
<OPTION value="Bond">Bond Passthrough       
<OPTION value="PGE">PG&E Passthrough          
<OPTION value="RR 6.14">R&R 6.14
<OPTION value="Costa Sub/Assign">Costa Hawkins (Sublessee or Assignee)     
<OPTION value="Costa Exempt">Costa Hawkins (Exemption)      
<OPTION value="Other Exempt">Other Exemption         
<OPTION value="Other Reason">Other Reason
</select>
<br>
<p><h2>Are you attaching evidence of this increase?</h2></p>

	<select name="evidence">
	<option value="y">Yes
	<option value="n">No
	</select>
<br><br>
    <input type=submit name="bilSubmit" value="DONE">
    &nbsp;&nbsp;
    <input type=submit name="bilSubmit" value="MORE">
</form>
====
}
sub printCompletedForm {
    print <<"====";
<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">

<head>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<meta name=ProgId content=Word.Document>
<meta name=Generator content="Microsoft Word 10">
<meta name=Originator content="Microsoft Word 10">
<link rel=File-List href="020formcpart1_files/filelist.xml">
<title>Tenant Petition 9/98</title>
<!--[if gte mso 9]><xml>
 <o:DocumentProperties>
  <o:Subject>Tenant Petition </o:Subject>
  <o:Author>Sandy Gartzman</o:Author>
  <o:Revision>2</o:Revision>
  <o:TotalTime>2</o:TotalTime>
  <o:LastPrinted>2000-11-15T23:38:00Z</o:LastPrinted>
  <o:Created>2004-05-12T05:03:00Z</o:Created>
  <o:LastSaved>2004-05-12T05:03:00Z</o:LastSaved>
  <o:Pages>1</o:Pages>
  <o:Words>398</o:Words>
  <o:Characters>2271</o:Characters>
  <o:Company> </o:Company>
  <o:Lines>18</o:Lines>
  <o:Paragraphs>5</o:Paragraphs>
  <o:CharactersWithSpaces>2664</o:CharactersWithSpaces>
  <o:Version>10.4219</o:Version>
 </o:DocumentProperties>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <w:WordDocument>
  <w:HyphenationZone>0</w:HyphenationZone>
  <w:DoNotHyphenateCaps/>
  <w:PunctuationKerning/>
  <w:DrawingGridHorizontalSpacing>6 pt</w:DrawingGridHorizontalSpacing>
  <w:DrawingGridVerticalSpacing>6 pt</w:DrawingGridVerticalSpacing>
  <w:DisplayHorizontalDrawingGridEvery>0</w:DisplayHorizontalDrawingGridEvery>
  <w:DisplayVerticalDrawingGridEvery>3</w:DisplayVerticalDrawingGridEvery>
  <w:UseMarginsForDrawingGridOrigin/>
  <w:DoNotShadeFormData/>
  <w:Compatibility>
   <w:OrigWordTableRules/>
   <w:NoLeading/>
   <w:SpacingInWholePoints/>
   <w:ShowBreaksInFrames/>
   <w:SuppressTopSpacing/>
   <w:SuppressTopSpacingMac5/>
   <w:MWSmallCaps/>
   <w:UsePrinterMetrics/>
   <w:FootnoteLayoutLikeWW8/>
   <w:ShapeLayoutLikeWW8/>
   <w:AlignTablesRowByRow/>
   <w:ForgetLastTabAlignment/>
   <w:LayoutRawTableWidth/>
   <w:LayoutTableRowsApart/>
   <w:UseWord97LineBreakingRules/>
  </w:Compatibility>
  <w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel>
 </w:WordDocument>
</xml><![endif]-->
<style>
<!--
 /* Font Definitions */
 \@font-face
	{font-family:Helvetica;
	panose-1:2 11 6 4 2 2 2 2 2 4;
	mso-font-alt:Arial;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:536902279 -2147483648 8 0 511 0;}
\@font-face
	{font-family:Palatino;
	panose-1:0 0 0 0 0 0 0 0 0 0;
	mso-font-alt:"Book Antiqua";
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
\@font-face
	{font-family:"Zapf Dingbats";
	panose-1:0 0 0 0 0 0 0 0 0 0;
	mso-font-alt:"Monotype Sorts";
	mso-font-charset:2;
	mso-generic-font-family:auto;
	mso-font-format:other;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-parent:"";
	margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	text-autospace:none;
	font-size:14.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;}
h1
	{mso-style-next:Normal;
	margin:0in;
	margin-bottom:.0001pt;
	text-align:center;
	mso-pagination:none;
	page-break-after:avoid;
	mso-outline-level:1;
	text-autospace:none;
	font-size:16.0pt;
	font-family:Palatino;
	mso-bidi-font-family:Palatino;
	mso-font-kerning:0pt;}
p.MsoHeader, li.MsoHeader, div.MsoHeader
	{margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	tab-stops:center 3.0in right 6.0in;
	text-autospace:none;
	font-size:14.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;}
p.MsoFooter, li.MsoFooter, div.MsoFooter
	{margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	tab-stops:center 3.0in right 6.0in;
	text-autospace:none;
	font-size:14.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;}
p.MsoTitle, li.MsoTitle, div.MsoTitle
	{margin:0in;
	margin-bottom:.0001pt;
	text-align:center;
	mso-pagination:widow-orphan;
	text-autospace:none;
	font-size:14.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;
	font-weight:bold;}
p.MsoBodyText, li.MsoBodyText, div.MsoBodyText
	{margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	text-autospace:none;
	font-size:12.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;
	font-weight:bold;}
p.MsoBodyTextIndent, li.MsoBodyTextIndent, div.MsoBodyTextIndent
	{margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:1.25in;
	margin-bottom:.0001pt;
	text-indent:-1.25in;
	mso-pagination:widow-orphan;
	tab-stops:right .5in 1.0in;
	text-autospace:none;
	font-size:12.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;}
p.MsoBodyTextIndent2, li.MsoBodyTextIndent2, div.MsoBodyTextIndent2
	{margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:27.0pt;
	margin-bottom:.0001pt;
	text-indent:-27.0pt;
	mso-pagination:widow-orphan;
	text-autospace:none;
	font-size:12.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;}
p.Boxes, li.Boxes, div.Boxes
	{mso-style-name:Boxes;
	mso-style-parent:"Body Text Indent";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:1.25in;
	margin-bottom:.0001pt;
	text-indent:-1.25in;
	mso-pagination:widow-orphan;
	tab-stops:right .5in 1.0in;
	text-autospace:none;
	font-size:12.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;}
p.Style1, li.Style1, div.Style1
	{mso-style-name:Style1;
	mso-style-parent:Boxes;
	margin-top:0in;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:1.25in;
	margin-bottom:.0001pt;
	text-indent:-1.25in;
	mso-pagination:widow-orphan;
	tab-stops:right .5in 1.0in;
	text-autospace:none;
	font-size:12.0pt;
	font-family:Helvetica;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:Helvetica;}
 /* Page Definitions */
 \@page
	{mso-page-border-surround-header:no;
	mso-page-border-surround-footer:no;}
\@page Section1
	{size:8.5in 11.0in;
	margin:.5in .5in .5in .5in;
	mso-header-margin:.5in;
	mso-footer-margin:.5in;
	mso-paper-source:0;}
div.Section1
	{page:Section1;}
 /* List Definitions */
 \@list l0
	{mso-list-id:1;
	mso-list-type:simple;
	mso-list-template-ids:1377289;}
\@list l0:level1
	{mso-level-number-format:alpha-upper;
	mso-level-tab-stop:.25in;
	mso-level-number-position:left;
	margin-left:.25in;
	text-indent:-.25in;}
ol
	{margin-bottom:0in;}
ul
	{margin-bottom:0in;}
-->
</style>
<!--[if gte mso 10]>
<style>
 /* Style Definitions */
 table.MsoNormalTable
	{mso-style-name:"Table Normal";
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-noshow:yes;
	mso-style-parent:"";
	mso-padding-alt:0in 5.4pt 0in 5.4pt;
	mso-para-margin:0in;
	mso-para-margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:10.0pt;
	font-family:"Times New Roman";}
</style>
<![endif]-->
</head>

<body lang=EN-US style='tab-interval:.2in;text-justify-trim:punctuation'>

<div class=Section1>

<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-padding-alt:0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:16.0pt;font-family:Palatino;mso-bidi-font-family:Palatino'>Residential
  Rent Stabilization &amp; Arbitration Board<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:16.0pt;font-family:Palatino;mso-bidi-font-family:Palatino'>City
  and County of San Francisco<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-line-height-alt:
  12.0pt;mso-pagination:none'><o:p>&nbsp;</o:p></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-line-height-alt:
  12.0pt;mso-pagination:none;tab-stops:.9in 1.3in 2.0in'><b>FORM C, Part 1</b><b><span
  style='font-size:10.0pt'><o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='text-align:center;line-height:18.0pt;
  mso-pagination:none'><b><u>TENANT’S RENT HISTORY SUMMARY<o:p></o:p></u></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='mso-pagination:none'><b><u><span style='font-size:
  12.0pt'><o:p><span style='text-decoration:none'>&nbsp;</span></o:p></span></u></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='mso-pagination:none'><b><u><span style='font-size:
  12.0pt'>Complete this page ONLY if you are (1) alleging that the landlord
  unlawfully increased your rent over the allowable limits on or after 4/1/82
  OR (2) requesting the Rent Board to determine whether your current rent is a
  lawful amount.<o:p></o:p></span></u></b></p>
  <p class=MsoNormal style='mso-pagination:none'><b><span style='font-size:
  10.0pt'><o:p>&nbsp;</o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:7'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:10.0pt'>1.<span
  style='mso-tab-count:2'>       </span>I moved in on 
====

#my $spaces = (30-$moveDate.length) /2; 
print "<u><span style='mso-tab-count:11'>";
foreach (1 ... 2) {print "&nbsp;";}
print "$moveDate";
foreach (1 ... 2) {print "&nbsp;";}
    print <<"====";
</span></u>.<span
  style='mso-spacerun:yes'>  </span>This was </span><span style='font-size:
  12.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>
====
if ($newTenancy eq "y")
{
    print "&#9635;";
}
else 
{
    print "&#9633;";
}
print <<"====";
</span><span
  style='font-size:10.0pt'> a new tenancy<span style='mso-spacerun:yes'>  
  </span></span>
<span style='font-size:12.0pt;font-family:"Zapf Dingbats";
  mso-bidi-font-family:"Zapf Dingbats"'>
====
if ($newTenancy eq "n")
{
    print "&#9635;";
}
else 
{
    print "&#9633;";
}
print <<"====";
</span><span style='font-size:10.0pt'>
  part of an existing tenancy.<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:8'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>2.<span style='mso-tab-count:2'>       </span>If you
  moved into a <u>new tenancy</u> and the unit was vacant immediately prior to
  your moving in, what was the initial<br>
  rent when you moved in? \$<u> <span style='mso-tab-count:7'>
====

if ($newTenancy eq "y")
{
    print "&nbsp;&nbsp;&nbsp;&nbsp;$initialRent&nbsp;&nbsp;&nbsp;&nbsp;";
}
else 
{
    print "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}
print <<"====";
</span></u><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:9'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>3.<span style='mso-tab-count:2'>       </span>If you
  moved into an <u>existing tenancy</u>, when did<span
  style='mso-spacerun:yes'>  </span>the first tenant(s) move in? <u><span
  style='mso-tab-count:12'>
====
if ($newTenancy eq "n")
{
    print "&nbsp;&nbsp;&nbsp;&nbsp;$firstTenantDate&nbsp;&nbsp;&nbsp;&nbsp;";
}
else 
{
    print "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}
    print <<"====";
</span><o:p></o:p></u></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:10'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><span style='mso-tab-count:2'>          </span>What
  was the initial rent for the first tenant(s)? \$<u> <span style='mso-tab-count:
  7'>
====

if ($newTenancy eq "n")
{
    print "&nbsp;&nbsp;&nbsp;&nbsp;$initialRent&nbsp;&nbsp;&nbsp;&nbsp;";
}
else 
{
    print "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}
    print <<"====";
</span><o:p></o:p></u></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:11'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>4.<span style='mso-tab-count:2'>       </span>The
  rent for the unit is currently \$ <u><span style='mso-tab-count:8'>
    &nbsp;&nbsp;&nbsp;&nbsp;$currRent&nbsp;&nbsp;&nbsp;&nbsp; </span></u><span
  style='mso-spacerun:yes'> </span>per month, as of <u><span style='mso-tab-count:
  12'>   &nbsp;&nbsp;&nbsp;&nbsp;$currDate&nbsp;&nbsp;&nbsp;&nbsp; </span></u>.<u><o:p></o:p></u></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:12'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='mso-pagination:none'><b><span style='font-size:
  10.0pt'>IN ORDER TO COMPLETE THIS FORM, YOU MUST FILL OUT THE CHART BELOW<u>.
  PLEASE<o:p></o:p></u></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:13'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='mso-pagination:none'><b><u><span style='font-size:
  10.0pt'>FOLLOW THESE INSTRUCTIONS CAREFULLY:</span></u></b><b><span
  style='font-size:10.0pt'><o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:14'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:15'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-left:0in;text-indent:0in;mso-pagination:
  none;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-size:
  10.0pt;mso-fareast-font-family:Helvetica'><span style='mso-list:Ignore'>A.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><![endif]><span
  style='font-size:10.0pt'>Please provide a list of all the rent increases
  since the tenancy began. Use the chart below. List all prior rent increases
  (since April 1981) for the tenancy, even if the increases occurred prior to
  your occupancy. <o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:16'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-left:0in;text-indent:0in;line-height:18.0pt;
  mso-pagination:none;mso-list:l0 level1 lfo1'><![if !supportLists]><span
  style='font-size:10.0pt;mso-fareast-font-family:Helvetica'><span
  style='mso-list:Ignore'>B.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><![endif]><span style='font-size:10.0pt'>If you pay rent
  to the owner or property manager, check here </span><span style='font-size:
  13.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>
====
if ($toWhom eq "tenant")
{

    print "&#9633;";
}
else 
{
    print "&#9635;";
}
print <<"====";
</span><span
  style='font-size:10.0pt'><span style='mso-spacerun:yes'>  </span>and please
  list <u>the rent for the entire rental unit</u>,<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:17'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-left:0in;text-indent:0in;line-height:18.0pt;
  mso-pagination:none;mso-list:l0 level1 lfo1'><![if !supportLists]><span
  style='font-size:10.0pt;mso-fareast-font-family:Helvetica'><span
  style='mso-list:Ignore'>C.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><![endif]><span style='font-size:10.0pt'>If you pay rent
  to a master tenant, check here </span><span style='font-size:13.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>
====
if ($toWhom eq "tenant")
{
    print "&#9635;";
}
else 
{
    print "&#9633;";
}
    print <<"====";
</span><span
  style='font-size:10.0pt'><span style='mso-spacerun:yes'>  </span>and please
  list <u>your share of the total rent for the rental unit</u>.<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:18;mso-yfti-lastrow:yes'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-left:0in;text-indent:0in;line-height:18.0pt;
  mso-pagination:none;mso-list:l0 level1 lfo1'><![if !supportLists]><span
  style='font-size:10.0pt;mso-fareast-font-family:Helvetica'><span
  style='mso-list:Ignore'>D.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><![endif]><span style='font-size:10.0pt'>If there was
  more than one reason for a rent increase on the same date (for example, an
  annual increase plus a<span style='mso-spacerun:yes'>  </span>capital<span
  style='mso-spacerun:yes'>  </span>improvement passthrough), <u>please list
  each increase amount as a separate increase in the chart below</u>.<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal align=center style='margin-left:.45in;text-align:center;
mso-pagination:none'><b><span style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></b></p>

<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-padding-alt:0in 4.0pt 0in 4.0pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-lastrow:yes;page-break-inside:avoid'>
  <td width=725 valign=top style='width:544.0pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .75pt;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none;
  tab-stops:center 27.0pt .75in 81.0pt 1.5in 135.0pt'><b><u><span
  style='font-size:10.0pt'>Reason for Rent Increase (select one reason from
  this list for each separate rent increase)</span></u></b><b><span
  style='font-size:10.0pt'>:<o:p></o:p></span></b></p>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>&radic;</span><span style='font-size:10.0pt'>Annual</span><span
  style='font-size:12.0pt'>/</span><span style='font-size:10.0pt'>Banked<span
  style='mso-spacerun:yes'>    </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>&radic;</span><span
  style='font-size:10.0pt'>Additional Housing Service<span
  style='mso-spacerun:yes'>    </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>&radic;</span><span
  style='font-size:10.0pt'>Capital Improvements<span
  style='mso-spacerun:yes'>    </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>&radic;</span><span
  style='font-size:10.0pt'>Operating &amp; Maintenance Costs<o:p></o:p></span></p>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>&radic;</span><span
  style='font-size:10.0pt'>Prop I Past Rent History<span
  style='mso-spacerun:yes'>    </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>&radic;</span><span
  style='font-size:10.0pt'>Comparable Rents<span style='mso-spacerun:yes'>   
  </span></span><span style='font-size:10.0pt;font-family:"Zapf Dingbats";
  mso-bidi-font-family:"Zapf Dingbats"'>&radic;</span><span style='font-size:10.0pt'>Bond
  Passthrough<span style='mso-spacerun:yes'>    </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>&radic;</span><span style='font-size:10.0pt'>PG&amp;E
  Passthrough<span style='mso-spacerun:yes'>     </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>&radic;</span><span style='font-size:10.0pt'>R&amp;R 6.14<o:p></o:p></span></p>
  <p class=MsoNormal style='mso-pagination:none;tab-stops:center 27.0pt .75in 81.0pt 1.5in 135.0pt'><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>&radic;</span><span style='font-size:10.0pt'>Costa Hawkins
  (Sublessee or Assignee)<span style='mso-spacerun:yes'>    </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>&radic;</span><span style='font-size:10.0pt'>Costa Hawkins
  (Exemption)<span style='mso-spacerun:yes'>    </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>&radic;</span><span style='font-size:10.0pt'>Other Exemption<span
  style='mso-spacerun:yes'>    </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>&radic;</span><span
  style='font-size:10.0pt'>Other Reason</span><span style='font-size:12.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal align=center style='text-align:center;line-height:18.0pt;
mso-pagination:none'><b><span style='font-size:11.0pt'>***List the first rent
increase (after move-in rent) <u>first</u>. List the most recent increase <u>last</u>.***<o:p></o:p></span></b></p>

<p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>

<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-padding-alt:0in 4.0pt 0in 4.0pt'>
 <tr style='mso-yfti-irow:0;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border:solid windowtext 1.5pt;
  border-right:solid windowtext 1.0pt;mso-border-alt:solid windowtext 1.5pt;
  mso-border-right-alt:solid windowtext .75pt;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:8.0pt'>Effective Date<o:p></o:p></span></p>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:8.0pt'>of Rent Increase<o:p></o:p></span></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:solid windowtext 1.5pt;
  border-left:none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .75pt;mso-border-top-alt:1.5pt;
  mso-border-left-alt:.75pt;mso-border-bottom-alt:1.5pt;mso-border-right-alt:
  .75pt;mso-border-color-alt:windowtext;mso-border-style-alt:solid;padding:
  0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:8.0pt'>Rent Increase <o:p></o:p></span></p>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:8.0pt'>Amount in \$\$<o:p></o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:solid windowtext 1.5pt;
  border-left:none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .75pt;mso-border-top-alt:1.5pt;
  mso-border-left-alt:.75pt;mso-border-bottom-alt:1.5pt;mso-border-right-alt:
  .75pt;mso-border-color-alt:windowtext;mso-border-style-alt:solid;padding:
  0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:8.0pt'><o:p>&nbsp;</o:p></span></p>
  <p class=MsoNormal align=center style='text-align:center;mso-pagination:none'><span
  style='font-size:8.0pt'>New Rent<o:p></o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:solid windowtext 1.5pt;
  border-left:none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .75pt;mso-border-top-alt:1.5pt;
  mso-border-left-alt:.75pt;mso-border-bottom-alt:1.5pt;mso-border-right-alt:
  .75pt;mso-border-color-alt:windowtext;mso-border-style-alt:solid;padding:
  0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:5.0pt;text-align:center;
  mso-pagination:none'><span style='font-size:8.0pt'>Reason for Rent Increase<o:p></o:p></span></p>
  <p class=MsoNormal align=center style='margin-right:5.0pt;text-align:center;
  mso-pagination:none'><span style='font-size:8.0pt'>(select from list above
  &amp; enter)<o:p></o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border:solid windowtext 1.5pt;
  border-left:none;mso-border-left-alt:solid windowtext .75pt;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  mso-pagination:none'><b><span style='font-size:8.0pt'>Evidence<br>
  <span style='mso-spacerun:yes'> </span>Attached<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border-top:none;border-left:
  solid windowtext 1.5pt;border-bottom:solid windowtext 1.5pt;border-right:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext 1.5pt;mso-border-alt:
  solid windowtext 1.5pt;mso-border-right-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='mso-pagination:none'><b><span style='font-size:
  8.0pt'>MOVE-IN DATE:<o:p></o:p></span></b></p>
  <p class=MsoNormal style='mso-pagination:none'><b><span style='font-size:
  8.0pt'>$moveDate<o:p>&nbsp;</o:p></span></b></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;background:#E5E5E5;mso-shading:windowtext;mso-pattern:gray-10 auto;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:4.0pt'><o:p>&nbsp;</o:p></span></p>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:8.0pt'>MOVE-IN
  RENT:<o:p></o:p></span></p>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:7.0pt'>$initialRent<o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:30.1pt;text-align:center;
  mso-pagination:none'><b><span style='font-size:9.0pt'>INITIAL BASE RENT</span></b><span
  style='font-size:9.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><o:p></o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.5pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  mso-pagination:none'><span style='font-size:12.0pt;font-family:"Zapf Dingbats";
  mso-bidi-font-family:"Zapf Dingbats"'><span
  style='mso-spacerun:yes'> </span><span style='mso-spacerun:yes'> </span><span
  style='mso-spacerun:yes'> </span>
====
if ($initialEvidence =~ /y/)
{
    print "&#9635;";
}
else 
{
    print "&#9633;";
}


    print <<"====";
<o:p></o:p></span></p>
  </td>
 </tr>
====

    my @allDates =split /#/, $increaseDateList;
my @allAmounts =split /#/, $increaseAmountList;
my @allRents =split /#/, $increaseRentList;
my @allReasons =split /#/, $increaseReasonList;
my @allEvidences =split /#/, $increaseEvidenceList;

    for (my $i = 1; $i<=$#allDates; $i++)
{
    my $date = $allDates[$i];
    my $amount = $allAmounts[$i];
    my $rent = $allRents[$i];
    my $reason = $allReasons[$i];
    my $evidence = $allEvidences[$i];


    print <<"====";
 <tr style='mso-yfti-irow:2;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border-top:none;border-left:
  solid windowtext 1.5pt;border-bottom:solid windowtext 1.5pt;border-right:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext 1.5pt;mso-border-alt:
  solid windowtext 1.5pt;mso-border-right-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>$date<o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>$amount<o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>$rent<o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='margin-right:30.1pt;line-height:18.0pt;mso-pagination:
  none'>
<span style='font-size:10.0pt'>
$reason
<o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.5pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  line-height:18.0pt;mso-pagination:none'><span style='font-size:12.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><span
  style='mso-spacerun:yes'> </span><span style='mso-spacerun:yes'> </span><span
  style='mso-spacerun:yes'> </span>
====
if ($evidence =~ /y/)
{
    print "&#9635;";
}
else 
{
    print "&#9633;";
}

print <<"====";
<o:p></o:p></span></p>
  </td>
 </tr>

====
}
    print <<"====";
</table>

<p class=MsoNormal align=center style='margin-right:30.1pt;text-align:center;
mso-pagination:none;tab-stops:.25in .5in .75in 1.0in 1.3in 1.5in 2.0in'><b><span
style='font-size:10.0pt'>IF ADDITIONAL SPACE IS NEEDED, CHECK HERE </span></b><span
style='font-size:17.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>&#9633;</span><b><span
style='font-size:11.0pt'> , THEN<o:p></o:p></span></b></p>

<p class=MsoNormal align=center style='margin-right:30.1pt;text-align:center;
mso-pagination:none;tab-stops:.25in .5in .75in 1.0in 1.3in 1.5in 2.0in'><b><span
style='font-size:11.0pt'>MAKE A </span></b><b><span style='font-size:10.0pt'>COPY
OF THIS PAGE AND ATTACH IT TO THE PETITION<o:p></o:p></span></b></p>

<p class=MsoNormal style='tab-stops:center 3.5in right 535.5pt'><span
style='font-size:10.0pt'><br>
25 Van Ness Avenue #320<span style='mso-tab-count:1'>                           </span></span><span
style='font-size:8.0pt'>jpg/forms/tpeta- c/word98/1-00</span><span
style='font-size:10.0pt'> <span style='mso-tab-count:1'>                                             </span>Phone
415.252.4602<o:p></o:p></span></p>

<p class=MsoNormal style='tab-stops:right 535.5pt'><span style='font-size:10.0pt'>San
Francisco, CA 94102-6033<span style='mso-tab-count:1'>                                                                                                           </span>FAX
415.252.4699</span></p>

</div>

</body>

</html>

====

}


print header, start_html('Rent Increase Form');
my $mycgi = new CGI;
my $stage = $mycgi->param('stage');
if ($stage eq "")
{
    &question_1;
}
elsif ($stage eq "1")
{
    my $day = $mycgi->param('day');
    my $month = $mycgi->param('month');
    my $year = $mycgi->param('year');
    $moveDate = "$month $day, $year";

    $newTenancy= $mycgi->param('newTenancy');

    if ($newTenancy eq "n") 
    {
	&question_3;
    }
    elsif ($newTenancy eq "y") 
    {
	&question_2;
    }
    else 
    {
	die "we fell off at line 1256\n";
    }
}
elsif (($stage eq "2") || ($stage eq "3"))
{
    $newTenancy= $mycgi->param('newTenancy');
    $moveDate = $mycgi->param('moveDate'); 
    $initialRent = $mycgi->param('initialRent');
    $initialEvidence = $mycgi->param('initialEvidence');
  if ($stage == 3)
  {
      my $day = $mycgi->param('day');
      my $month = $mycgi->param('month');
      my $year = $mycgi->param('year');
      $firstTenantDate = "$month $day, $year"; 
  }
    &question_4;
}
elsif ($stage eq "4")
{
    $newTenancy= $mycgi->param('newTenancy');
    $moveDate = $mycgi->param('moveDate');
    $initialRent = $mycgi->param('initialRent');
    $initialEvidence = $mycgi->param('initialEvidence');
    $firstTenantDate = $mycgi->param('firstTenantDate');
    $currRent = $mycgi->param('currRent');
    my $day = $mycgi->param('day');
    my $month = $mycgi->param('month');
    my $year = $mycgi->param('year');
    $currDate = "$month $day, $year";
    &payToWhom;
}
elsif ($stage eq "PTW")
{

    $newTenancy= $mycgi->param('newTenancy');
    $moveDate = $mycgi->param('moveDate');
    $initialRent = $mycgi->param('initialRent');
    $initialEvidence = $mycgi->param('initialEvidence');
    $firstTenantDate = $mycgi->param('firstTenantDate');
    $currRent = $mycgi->param('currRent');
    $currDate = $mycgi->param('currDate');
    $toWhom = $mycgi->param('toWhom');
    &build_increase_list;
}
elsif ($stage eq "BIL")
{
    $newTenancy= $mycgi->param('newTenancy');
    $moveDate = $mycgi->param('moveDate');
    $initialRent = $mycgi->param('initialRent');
    $initialEvidence = $mycgi->param('initialEvidence');
    $firstTenantDate = $mycgi->param('firstTenantDate');
    $currRent = $mycgi->param('currRent');
    $currDate = $mycgi->param('currDate');
    $toWhom = $mycgi->param('toWhom');

    $increaseDateList = $mycgi->param('increaseDateList');
    my $day = $mycgi->param('day');
    my $month = $mycgi->param('month');
    my $year = $mycgi->param('year');
    my $nextDate = "$month $day, $year";
    $increaseDateList .= "# " . $nextDate;

    $increaseAmountList = $mycgi->param('increaseAmountList');
    my $increment  = $mycgi->param('increment');
    $increaseAmountList .= "# " . $increment;
    
    $increaseRentList = $mycgi->param('increaseRentList');
    my $newRent  = $mycgi->param('newRent');
    $increaseRentList .= "# " . $newRent;

    $increaseReasonList = $mycgi->param('increaseReasonList');
    my $reason  = $mycgi->param('reason');
    $increaseReasonList .= "# " . $reason;

    $increaseEvidenceList = $mycgi->param('increaseEvidenceList');
    my $evidence  = $mycgi->param('evidence');
    $increaseEvidenceList .= "# " . $evidence;

    my $bilSubmit = $mycgi->param('bilSubmit');
    
    if ($bilSubmit eq "MORE")
    {
	&build_increase_list;
    }
    elsif ($bilSubmit eq "DONE")
    {
	&printCompletedForm;
    }
}
print end_html;




