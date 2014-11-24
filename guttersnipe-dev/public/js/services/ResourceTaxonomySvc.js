/**
 *
 */

var resourceTaxonomy=angular.module('ResourceTaxonomyService', []);
resourceTaxonomy.factory('ResourceTaxonomy', function($http){

    var resourceTax = {
        resource_types : {
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

        housing : {
            notes: '',
            groupImg: '',
            selection: [
                {
                    name: 'Existing Squat',
                    img: ''
                }, {
                    name: 'Start a Squat',
                    img: ''
                }, {
                    name: 'Free Communal House',
                    img: ''
                }, {
                    name: 'Shelter',
                    img: ''
                }, {
                    name: 'Other Housing',
                    img: ''
                }
            ]
        },
        medical : {

            notes: '',
            groupImg: '',
            selection: [
                {
                    name: 'General Medicine (Western) ',
                    img: ''
                }, {
                    name: 'Emergency Medicine (Western) ',
                    img: ''
                }, {
                    name: 'Mental Health',
                    img: ''
                }, {
                    name: 'Holistic',
                    img: ''
                }, {
                    name: 'Herbal',
                    img: ''
                }, {
                    name: 'Non Western',
                    img: ''
                }, {
                    name: 'Health Clinic',
                    img: ''
                } ,  {
                    name: 'Drug Health / Abuse',
                    img: ''
                }, {
                    name: 'Sexual Health',
                    img: ''
                }, {
                    name: 'Sexual / Physical Abuse',
                    img: ''
                }, {
                    name: 'Trans*',
                    img: ''
                }, {
                    name: 'Women\'s',
                    img: ''
                }
            ]
        },

        food: {
            grain: {
                notes: '',
                groupImg: '',
                eating_arrangement : {
                    selection: [
                        {
                            name: 'Food Not Bombs',
                            img: ''
                        },             {
                            name: 'Free Communal Meal',
                            img: ''
                        },      {
                            name: 'Free Food',
                            img: ''
                        } ,    {
                            name: 'Dumpster',
                            img: ''
                        }
                    ],
                },
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
                    },  {
                        name: 'Cheese',
                        img: ''
                    }, {
                        name: 'Yogurt',
                        img: ''
                    }, {
                        name: 'Non-Cow Dairy',
                        img: ''
                    }, {
                        name: 'Non-Animal Dairy',
                        img: ''
                    }
                ]}
        }
    };

    return {

        get: function () {
            return resourceTax;
        }
    }
});
