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

sub runStage_2_5 {
}

sub runStage_3{
    print <<"====";
    <p>What is the current rent of the unit?</p>
====
}
sub runStage_4{
    print <<"====";
    When did it start to be this much?
====
}

sub runStage_5{

    print <<"====";
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
printCompletedForm {
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
 @font-face
	{font-family:Helvetica;
	panose-1:2 11 6 4 2 2 2 2 2 4;
	mso-font-alt:Arial;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:536902279 -2147483648 8 0 511 0;}
@font-face
	{font-family:Palatino;
	panose-1:0 0 0 0 0 0 0 0 0 0;
	mso-font-alt:"Book Antiqua";
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:variable;
	mso-font-signature:3 0 0 0 1 0;}
@font-face
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
 @page
	{mso-page-border-surround-header:no;
	mso-page-border-surround-footer:no;}
@page Section1
	{size:8.5in 11.0in;
	margin:.5in .5in .5in .5in;
	mso-header-margin:.5in;
	mso-footer-margin:.5in;
	mso-paper-source:0;}
div.Section1
	{page:Section1;}
 /* List Definitions */
 @list l0
	{mso-list-id:1;
	mso-list-type:simple;
	mso-list-template-ids:1377289;}
@list l0:level1
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
  style='mso-tab-count:2'>       </span>I moved in on <u><span
  style='mso-tab-count:11'>                                                   </span></u>.<span
  style='mso-spacerun:yes'>  </span>This was </span><span style='font-size:
  12.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>r</span><span
  style='font-size:10.0pt'> a new tenancy<span style='mso-spacerun:yes'>  
  </span></span><span style='font-size:12.0pt;font-family:"Zapf Dingbats";
  mso-bidi-font-family:"Zapf Dingbats"'>r</span><span style='font-size:10.0pt'>
  part of an existing tenancy.<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:8'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>2.<span style='mso-tab-count:2'>       </span>If you
  moved into a <u>new tenancy</u> and the unit was vacant immediately prior to
  your moving in, what was the initial<br>
  rent when you moved in? $<u> <span style='mso-tab-count:7'>                                </span></u><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:9'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>3.<span style='mso-tab-count:2'>       </span>If you
  moved into an <u>existing tenancy</u>, when did<span
  style='mso-spacerun:yes'>  </span>the first tenant(s) move in? <u><span
  style='mso-tab-count:12'>                                                         </span><o:p></o:p></u></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:10'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><span style='mso-tab-count:2'>          </span>What
  was the initial rent for the first tenant(s)? $<u> <span style='mso-tab-count:
  7'>                             </span><o:p></o:p></u></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:11'>
  <td width=734 valign=top style='width:7.65in;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'>4.<span style='mso-tab-count:2'>       </span>The
  rent for the unit is currently $ <u><span style='mso-tab-count:8'>                                     </span></u><span
  style='mso-spacerun:yes'> </span>per month, as of <u><span style='mso-tab-count:
  12'>                                                       </span></u>.<u><o:p></o:p></u></span></p>
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
  13.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>r</span><span
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
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>r</span><span
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
  "Zapf Dingbats"'>4</span><span style='font-size:10.0pt'>Annual</span><span
  style='font-size:12.0pt'>/</span><span style='font-size:10.0pt'>Banked<span
  style='mso-spacerun:yes'>        </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>4</span><span
  style='font-size:10.0pt'>Additional Housing Service<span
  style='mso-spacerun:yes'>       </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>4</span><span
  style='font-size:10.0pt'>Capital Improvements<span
  style='mso-spacerun:yes'>       </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>4</span><span
  style='font-size:10.0pt'>Operating &amp; Maintenance Costs<o:p></o:p></span></p>
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>4</span><span
  style='font-size:10.0pt'>Prop I Past Rent History<span
  style='mso-spacerun:yes'>     </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>4</span><span
  style='font-size:10.0pt'>Comparable Rents<span style='mso-spacerun:yes'>   
  </span></span><span style='font-size:10.0pt;font-family:"Zapf Dingbats";
  mso-bidi-font-family:"Zapf Dingbats"'>4</span><span style='font-size:10.0pt'>Bond
  Passthrough<span style='mso-spacerun:yes'>       </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>4</span><span style='font-size:10.0pt'>PG&amp;E
  Passthrough<span style='mso-spacerun:yes'>          </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>4</span><span style='font-size:10.0pt'>R&amp;R 6.14<o:p></o:p></span></p>
  <p class=MsoNormal style='mso-pagination:none;tab-stops:center 27.0pt .75in 81.0pt 1.5in 135.0pt'><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>4</span><span style='font-size:10.0pt'>Costa Hawkins
  (Sublessee or Assignee)<span style='mso-spacerun:yes'>     </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>4</span><span style='font-size:10.0pt'>Costa Hawkins
  (Exemption)<span style='mso-spacerun:yes'>      </span></span><span
  style='font-size:10.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'>4</span><span style='font-size:10.0pt'>Other Exemption<span
  style='mso-spacerun:yes'>         </span></span><span style='font-size:10.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>4</span><span
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
  style='font-size:8.0pt'>Amount in $$<o:p></o:p></span></p>
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
  8.0pt'><o:p>&nbsp;</o:p></span></b></p>
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
  <p class=MsoNormal style='mso-pagination:none'><span style='font-size:7.0pt'><o:p>&nbsp;</o:p></span></p>
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
  style='mso-spacerun:yes'> </span>r<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border-top:none;border-left:
  solid windowtext 1.5pt;border-bottom:solid windowtext 1.5pt;border-right:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext 1.5pt;mso-border-alt:
  solid windowtext 1.5pt;mso-border-right-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='margin-right:30.1pt;line-height:18.0pt;mso-pagination:
  none'><span style='font-size:12.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.5pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  line-height:18.0pt;mso-pagination:none'><span style='font-size:12.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><span
  style='mso-spacerun:yes'> </span><span style='mso-spacerun:yes'> </span><span
  style='mso-spacerun:yes'> </span>r<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border-top:none;border-left:
  solid windowtext 1.5pt;border-bottom:solid windowtext 1.5pt;border-right:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext 1.5pt;mso-border-alt:
  solid windowtext 1.5pt;mso-border-right-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='margin-right:30.1pt;line-height:18.0pt;mso-pagination:
  none'><span style='font-size:12.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.5pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  line-height:18.0pt;mso-pagination:none'><span style='font-size:12.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><span
  style='mso-spacerun:yes'> </span><span style='mso-spacerun:yes'> </span><span
  style='mso-spacerun:yes'> </span>r<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border-top:none;border-left:
  solid windowtext 1.5pt;border-bottom:solid windowtext 1.5pt;border-right:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext 1.5pt;mso-border-alt:
  solid windowtext 1.5pt;mso-border-right-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='margin-right:30.1pt;line-height:18.0pt;mso-pagination:
  none'><span style='font-size:12.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.5pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  line-height:18.0pt;mso-pagination:none'><span style='font-size:12.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><span
  style='mso-spacerun:yes'> </span><span style='mso-spacerun:yes'> </span><span
  style='mso-spacerun:yes'> </span>r<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border-top:none;border-left:
  solid windowtext 1.5pt;border-bottom:solid windowtext 1.5pt;border-right:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext 1.5pt;mso-border-alt:
  solid windowtext 1.5pt;mso-border-right-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='margin-right:30.1pt;line-height:18.0pt;mso-pagination:
  none'><span style='font-size:12.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.5pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  line-height:18.0pt;mso-pagination:none'><span style='font-size:12.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><span
  style='mso-spacerun:yes'> </span><span style='mso-spacerun:yes'> </span><span
  style='mso-spacerun:yes'> </span>r<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6;mso-yfti-lastrow:yes;page-break-inside:avoid'>
  <td width=168 valign=top style='width:1.75in;border-top:none;border-left:
  solid windowtext 1.5pt;border-bottom:solid windowtext 1.5pt;border-right:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext 1.5pt;mso-border-alt:
  solid windowtext 1.5pt;mso-border-right-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=156 valign=top style='width:117.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=149 valign=top style='width:112.0pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='line-height:18.0pt;mso-pagination:none'><span
  style='font-size:10.0pt'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 valign=top style='width:2.0in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  mso-border-top-alt:1.5pt;mso-border-left-alt:.75pt;mso-border-bottom-alt:
  1.5pt;mso-border-right-alt:.75pt;mso-border-color-alt:windowtext;mso-border-style-alt:
  solid;padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal style='margin-right:30.1pt;line-height:18.0pt;mso-pagination:
  none'><span style='font-size:12.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:
  "Zapf Dingbats"'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=66 valign=top style='width:49.5pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.5pt;border-right:solid windowtext 1.5pt;
  mso-border-top-alt:solid windowtext 1.5pt;mso-border-left-alt:solid windowtext .75pt;
  padding:0in 4.0pt 0in 4.0pt'>
  <p class=MsoNormal align=center style='margin-right:-14.9pt;text-align:center;
  line-height:18.0pt;mso-pagination:none'><span style='font-size:12.0pt;
  font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'><span
  style='mso-spacerun:yes'> </span><span style='mso-spacerun:yes'> </span><span
  style='mso-spacerun:yes'> </span>r<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal align=center style='margin-right:30.1pt;text-align:center;
mso-pagination:none;tab-stops:.25in .5in .75in 1.0in 1.3in 1.5in 2.0in'><b><span
style='font-size:10.0pt'>IF ADDITIONAL SPACE IS NEEDED, CHECK HERE </span></b><span
style='font-size:17.0pt;font-family:"Zapf Dingbats";mso-bidi-font-family:"Zapf Dingbats"'>r</span><b><span
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

print header, start_html('Property Search Results');
$mycgi = new CGI;

&runStage_1;
print end_html;

