<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "LatLng";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 90;

$data_type_options_html =<<<EOF
<table>
<tr>
<td> <input type="checkbox" name="includeLat_\$ROW\$" id="includeLat_\$ROW\$" checked /><label for="includeLat_\$ROW\$">{$LANG["LatLng_latitude"]}</label>&nbsp; </td>
  <td> <label> base: <input type="text" name="latBase_\$ROW\$" size="5" id="latBase_\$ROW\$"  /></label> </td>
  <td> <label> distance: <input type="text" name="latDistance_\$ROW\$" size="5" id="latDistance_\$ROW\$"  /></label> </td>
</tr>
<tr>
  <td> <input type="checkbox" name="includeLng_\$ROW\$" id="includeLng_\$ROW\$" checked /><label for="includeLng_\$ROW\$">{$LANG["LatLng_longitude"]}</label> </td>
  <td> <label> base: <input type="text" name="lngBase_\$ROW\$" size="5" id="lngBase_\$ROW\$"  /></label> </td>
  <td> <label> distance: <input type="text" name="lngDistance_\$ROW\$" size="5" id="lngDistance_\$ROW\$"  /></label> </td>
</tr>
<tr>
<td>  <label>Distribution: </label> </td>
<td> <label> MAX <input type="radio" value="MAX"  name="distro_\$ROW\$" id="distro_\$ROW\$"  checked="checked" /></label></td>
<td> <label> STD <input type="radio" value="STD"  name="distro_\$ROW\$"   id="distro_\$ROW\$"  /> </label></td>
<td> <label> CIR <input type="radio" value="CIR"  name="distro_\$ROW\$"   id="distro_\$ROW\$"  /> </label></td>
</tr>

</table>
EOF;


$help_popup_width = 360;
$help_html_content =<<<EOF
  <p>
    {$LANG["LatLng_help"]}
  </p>
EOF;

