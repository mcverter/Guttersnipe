
  <h1># Guttersnipe</h1>
    <h2>Radical Resource Sharing (react-native/node/express/postgres)</h2>

<a href="https://github.com/mcverter/Guttersnipe/blob/guttersnipe-mobile/GuttersnipeSitemapWireframeSketch.pdf">Download Wireframes.</a></p>

Thanks for looking at this project.  Let me know if you have any feedback.

I have been thinking about it for a while - actually the first sketches of it are from 1998
I have made a few failed attempts to put something together, but think I finally have the steam to do something with it.
I wrote a very long and detailed tech spec doc but I think I can keep it pretty simple for in this email.

This is basically a simple mobile CMS. 

The basic intention is to promote a society based on mutual aid and the sharing of resources.
(This is a thinly veiled reference to the philosophy of anarchist communist thinker Pyotr Kropotkin)

This will be implemented through an app that will enable people to post and comment upon resources that are freely available.  

SHAREABLES are characterized by 
"	Name
"	(optional) Description
"	Category (eg:  FOOD, MEDICINE, SHELTER)
"	Subcategory (eg: Dumpsters, Food Not Bombs, Church meals)
"	Street Address
"	Geolocation 
"	(optional) Availability Time

SEARCHABLES are viewable in
"	Lists
"	Maps
"	Detail View (All info, including map and comments)
"	Calendar Date 

SEARCHABLES are searchable by
"	Category / subcategory 
"	Geography

USER ACCOUNTS are not required to search or browse SHAREABLES.  They are characterized by
"	Username
"	Password 
"	(optional) Email
 
 

REGISTERED USERS have the capacity to 
"	Add comments to Shareables
"	Give ratings to Shareables

Potentially, a chat feature will be added to each shareable through which all users (registered and guests) can strategize about each resource.  These chats will not be saved.  


Codebase

Back end: Postgres, node, and express
Front end:  React native
Github: https://github.com/mcverter/Guttersnipe



Audience

I have discussed this project with various organizations and they all seem pretty excited by it.
I have most recently (a few years ago) pitched the project to Freegans, a group best known for their promotion of dumpster diving, as a way to organize and formalize their dumpster directory.  

I showed them a previous iteration of this project and they were enthusiastic about it, but then told me that it would have to be a mobile app

