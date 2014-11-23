var resourceTaxonomy=angular.module('ResourceTaxonomyService', []);
resourceTaxonomy.factory('ResourceTaxonomy', function($http){
    var resources = {
        top_level : {
            notes: '',
            groupImg: '',
            selection: [
                {
                    name: 'food',
                    img: 'cutlery6'
                },
                {
                    name: 'housing',
                    img: 'home153'
                },
                {
                    name: 'medical',
                    img: ''
                },
            ]},
        food: {
            grain: {
                notes: '',
                groupImg: '',
                selection: [
                    {
                        name: 'Bread',
                        img: ''
                    },
                    {
                        name: 'Pastries',
                        img: 'cupcake4'
                    },
                    {
                        name: 'Grains (rice, oats, etc)',
                        img: ''
                    },
                    {
                        name: 'Other Grain Group',
                        img: ''
                    }
                ]},
            produce: {
                notes: '',
                groupImg: '',
                selection:  [

                    {
                        name: 'Fruit',
                        img: 'apply55'
                    },
                    {
                        name: 'Vegetables',
                        img: 'carrot5'
                    },
                    {
                        name: 'Juice',
                        img: 'drink2'
                    },
                    {
                        name: 'Herbs',
                        img: 'herbal1'
                    },
                    {
                        name: 'Other Produce',
                        img: ''
                    }
                ]},
            protein: {
                notes: '',
                groupImg: '',
                selection : [{
                    name: 'Nuts',
                    img :'hazelnut1'
                },{
                    name: 'Beans',
                    img :''
                },{
                    name: 'Other Non Animal',
                    img :''
                },  {
                    name: 'Eggs',
                    img :''
                },{
                    name: 'Cow',
                    img :'cow2'
                },{
                    name: 'Bird',
                    img :'chicken8'
                },{
                    name: 'Pig',
                    img :''
                },  {
                    name: 'Other Animal',
                    img :'dog56'
                },
                ]},

            dairy: {
                notes: '',
                groupImg: '',
                selection : [
                    {
                        name: 'Milk',
                        img: 'milk8'
                    },                     {
                        name: 'Cheese',
                        img: ''
                    },                    {
                        name: 'Yogurt',
                        img: ''
                    },                    {
                        name: 'Non-Cow Dairy',
                        img: ''
                    },                    {
                        name: 'Non-Animal Dairy',
                        img: ''
                    }
                ]}
        }
    };

    return {

        get: function () {
            return resourceTaxonomy;
        }
    }
});
