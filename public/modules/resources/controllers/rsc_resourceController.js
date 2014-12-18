(function (angular, app) {
  'use strict';

  app.controller('ResourceController', ['$scope', '$compile', // general
//        'uiCalendarConfig', // place
//        '$locationService', // time
//        '$resourceTaxonomyService', //kind
    function ($scope, $compile,
              uiCalendarConfig,
              $locationService,
              $resourceTaxonomyService
      ){

      /*
       Object.defineProperties($scope, {

       resourceTypes: 'foo', /*[
       {name: 'Food'},
       {name: 'Housing'},
       {name: 'Health'}
       ],
       resourceTypes : {
       enumerable: true,
       get: function getResourceTypes() {
       return $resourceTaxonomyService.resourceTypes;
       }
       },


       resourceDetails: "goo"
       resourceDetails : {
       enumerable: true,
       get: function getResourceDetails(type) {
       return $resourceTaxonomyService[type];
       }
       }

       });
       */
      $scope.resourceTypes = [
        {name: 'Food'},
        {name: 'Housing'},
        {name: 'Health'}
      ];
      $scope.resourceDetails = {
        type : [
          {name: 'Dumpster'},
          {name: 'Food Not Bombs'},
          {name: 'Free Meal'},
          {name: 'Food Donation'}
        ],
        produce: [
          {name: "Fruit"},
          {name: "Vegetables"},
          {name: "Juice"},
          {name: "Other"},
        ],
        grains: [
          {name: "Bread"},
          {name: "Pastries"},
          {name: "Gluten Free Bread"},
          {name: "Grains (rice, oats, etc)"},
          {name: "Other"},
        ],
        dairy: [
          {name: "Milk"},
          {name: "Cheese"},
          {name: "Cream/Yogurt"},
          {name: "Non-bovine dairy"},
          {name: "Non-animal dairy"},
          {name: "Other"},
        ],
        proteins: [
          {name: "Nuts"},
          {name: "Beans"},
          {name: "Other non-animal protein"},
          {name: "Cow"},
          {name: "Pig"},
          {name: "Bird"},
          {name: "Other animal protein"},
        ]
      };
      console.log($scope);
      console.log("Types", $scope.resourceTypes);
      console.log("Details", $scope.resourceDetails);
    }]);
})(window.angular, window.guttersnipe);

/*

 <!--

 <h1> Report on Food </h1>
 <ng-form role="form" class="form-horizontal">
 <div id="address">
 <label for="street_address">Street Address</label>
 <input type="text" class="form-control" id="street_address" placeholder="">
 </div>
 <button type="button" class="btn btn-default" ng-click="geolocateAddress()">Find Address</button>
 <div id="mapdiv">
 <div id="map-display">

 </div>
 <div id="map-approval">
 <button type="button" class="btn btn-success" ng-click="">Correct</button>
 <button type="button" class="btn btn-danger" ng-click="">Incorrect</button>
 </div>
 </div>
 <div id="site_detail">
 <div id="summary_div">
 <div class="form-group">
 <label for="summary">Summary</label>
 <input type="text" class="form-control" id="summary" placeholder="Brief summary (less than 50 characters)">
 </div>
 </div>
 <div id="description_div">
 <div class="form-group">
 <label for="description">Detailed Description</label>
 <textarea class="form-control" id="description" rows="5"></textarea>
 </div>
 </div>

 <div id="food_div">
 <div id="foodtype_div">
 <h2>Food Type</h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="grain-div"> Breads And Grains
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="produce-div"> Fruits and Vegetables
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="protein-div">Proteins
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="dairy-div"> Dairy
 </label>
 </div>
 </div>


 <div id="grain_div">
 <h2>Breads and Grains</h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="Bread"> Bread
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="Pastries"> Pastries
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="grains">Grains (rice, oats, etc)
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="Other grain"> Other grains
 </label>
 </div>

 <div id="produce_div">
 <h2> Produce </h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="fruit">  Fruit
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="vegetables"> Vegetables
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="juice"> Juice
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="herbs"> Herbs
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="other"> Other Produce
 </label>
 </div>



 <div id="dairy_div">
 <h2> Dairy </h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="milk"> Milk
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="cheese"> Cheese
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="cream"> Cream/Yogurt
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="nocow"> Non-Cow Dairy
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="other"> Other Dairy
 </label>
 </div>

 <div id="protein_div">
 <h2> Protein</h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Cow"> Cow
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Pig"> Pig
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Bird"> Poultry
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Nuts"> Nuts
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Beans"> Beans
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Other animal protein"> Other animal protein
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Other non-animal protein"> Other non-animal protein
 </label>
 </div>
 </div>
 </ng-form>

 -->

 <ng-form>
 <h3>To the following organizations:</h3>
 <ul>
 <li ng-repeat="type in resourceTaxonomy.resource_types.selection">

 <!-- make this into a directive -->
 {{selection.name}} <img class="img-responsive" src="{{resourceTaxonomy.IMG_DIR}}{{selection.img}}.svg">

 </li>
 </ul>
 <div ng-repeat="type in resourceTaxonomy.resource_types.selection">
 foo
 </div>


 </ng-form>

 <!--

 <h1> Report on Food </h1>
 <ng-form role="form" class="form-horizontal">
 <div id="address">
 <label for="street_address">Street Address</label>
 <input type="text" class="form-control" id="street_address" placeholder="">
 </div>
 <button type="button" class="btn btn-default" ng-click="geolocateAddress()">Find Address</button>
 <div id="mapdiv">
 <div id="map-display">

 </div>
 <div id="map-approval">
 <button type="button" class="btn btn-success" ng-click="">Correct</button>
 <button type="button" class="btn btn-danger" ng-click="">Incorrect</button>
 </div>
 </div>
 <div id="site_detail">
 <div id="summary_div">
 <div class="form-group">
 <label for="summary">Summary</label>
 <input type="text" class="form-control" id="summary" placeholder="Brief summary (less than 50 characters)">
 </div>
 </div>
 <div id="description_div">
 <div class="form-group">
 <label for="description">Detailed Description</label>
 <textarea class="form-control" id="description" rows="5"></textarea>
 </div>
 </div>

 <div id="food_div">
 <div id="foodtype_div">
 <h2>Food Type</h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="grain-div"> Breads And Grains
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="produce-div"> Fruits and Vegetables
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="protein-div">Proteins
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="dairy-div"> Dairy
 </label>
 </div>
 </div>


 <div id="grain_div">
 <h2>Breads and Grains</h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="Bread"> Bread
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="Pastries"> Pastries
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="grains">Grains (rice, oats, etc)
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="grain" value="Other grain"> Other grains
 </label>
 </div>

 <div id="produce_div">
 <h2> Produce </h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="fruit">  Fruit
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="vegetables"> Vegetables
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="juice"> Juice
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="herbs"> Herbs
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="produce" value="other"> Other Produce
 </label>
 </div>



 <div id="dairy_div">
 <h2> Dairy </h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="milk"> Milk
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="cheese"> Cheese
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="cream"> Cream/Yogurt
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="nocow"> Non-Cow Dairy
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="dairy" value="other"> Other Dairy
 </label>
 </div>

 <div id="protein_div">
 <h2> Protein</h2>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Cow"> Cow
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Pig"> Pig
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Bird"> Poultry
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Nuts"> Nuts
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Beans"> Beans
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Other animal protein"> Other animal protein
 </label>
 <label class="checkbox-inline">
 <input type="checkbox" name="protein" value="Other non-animal protein"> Other non-animal protein
 </label>
 </div>
 </div>
 </ng-form>

 -->

 */