######### Protractor Tests ##########
## Page Objects
pro_po_string = """
        var {field} = element(by.id('{field}'));
        this.set{Field} = function({field}Text) {{ {field}.clear(); {field}.sendKeys({field}Text); }};
        """
# Strings to test Additions
pro_string="""
        {resource}.set{Field}("Your Title text here");"""

pro_text= """
        {resource}.set{Field}("Your Body text here 77569yuii3wui&%$$^"); """


pro_boolean=""" 
        element(by.css("input[type='radio'][value='false']")).click(); """

pro_big_int= """ 
        {resource}.set{Field}(9870654321); """

pro_int = """ 
        {resource}.set{Field}(56); """

pro_email = """
        {resource}.set{Field}("youremail@flask-scaffold.git");"""

pro_url = """ 
        {resource}.set{Field}("http://techarena51.com");   """

pro_timestamp = """ 
        {resource}.set{Field}("2014-12-22T03:12:58.019077+00:00"); """

pro_date = """ 
        element(by.name("{field}")).sendKeys("12/11/2015"); """

pro_decimal = """ 
        {resource}.set{Field}("67.89"); """

# Strings to tests Edits
update_pro_string="""
        {resource}.set{Field}("Your Updated Title text here");"""

update_pro_text= """
        {resource}.set{Field}("Your Updated Body text here 77569yuii3wui&%$$^"); """

update_pro_boolean= """
        element(by.css("input[type='radio'][value='true']")).click(); """

update_pro_big_int= """
        {resource}.set{Field}(9870646321); """

update_pro_int = """
        {resource}.set{Field}(67); """

update_pro_email = """
        {resource}.set{Field}("yourupdatedemail@flask-scaffold.git");"""

update_pro_url = """
        {resource}.set{Field}("https://github.com/Leo-G/DevopsWiki");   """

update_pro_timestamp = """
        {resource}.set{Field}("2015-12-22T03:12:58.019077+00:00"); """

update_pro_date = """
        element(by.name("{field}")).sendKeys("12/23/2015"); """

update_pro_decimal = """
        {resource}.set{Field}("67.79"); """

######### Protractor Tests End ##########

######View Fields###########
add_string = """ request_dict['{}'],"""
######### START Unit TEST FIELDS #####################
####ADD####
string_test = "test string"
boolean_test = "true"
integer_test = 35678
big_integer_test = 9820109678
email_test = "testing@flask.pocoo.com"
url_test = "http://techarena51.com"
date_time_test ="2015-12-22T03:12:58.019077+00:00"
date_test = "2015-06-26"
decimal_test = "48.6789899"
text_test = "How to build CRUD app with Python, Flask, SQLAlchemy and MySQL. Som reand456989@#$%^%> <html/>"
####UPDATE####
update_string_test = "test string"
update_boolean_test = "false"
update_integer_test = 35678
update_big_integer_test = 9820109678
update_email_test = "testing@flask.pocoo.com"
update_url_test = "http://techarena51.com"
update_date_time_test ="2015-12-22T03:12:58.019077+00:00"
update_date_test = "2015-06-26"
update_decimal_test = "48.6789899"
update_text_test = "How to build CRUD app with Python, Flask, SQLAlchemy and MySQL. Som reand456989@#$%^%> <html/>"


########### Controller.js Fields ##########
controller_field = """{{headerName: "{field}", field: "{field}", width: 300 }},"""

# Radio button default checked
radio_button_string = """ $scope.{resource}.data = {{ "attributes ": {{ "{field}" : "true" }} }} """
########## _form.html Form Fields #####################
form_field = """
    <input placeholder="{field}*" type="{field_type}" id="{field}" name="{field}"  ng-model="{resource}.data.attributes.{field}"  required>
       """
date_field_string = """
    <input placeholder="{field}*" type="{field_type}" id="{field}" name="{field}"  formatdate ng-model="{resource}.data.attributes.{field}"   required>"""
      
decimal_form_string = """
    <input placeholder="{field}*" type="number" step="any" id="{field}" name="{field}"  string-to-number ng-model="{resource}.data.attributes.{field}"   required>"""
text_form_string  = """
    <textarea type="text" placeholder="{field}*" name="{field}" id="{field}" ng-model="{resource}.data.attributes.{field}"  required> </textarea> 
          """
boolean_form_string = """
    <div class="form-radio">
       <label>{Field}</label>
       <input type="radio" ng-model="{resource}.data.attributes.{field}" name="{field}" ng-value="true"  required>
       <label>True</label>
       <input type="radio" ng-model="{resource}.data.attributes.{field}"  name="{field}"ng-value="false">
       <label>False</label>
    </div>
"""
