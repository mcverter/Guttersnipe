var Resource =
{
    "thing":
    {
        "description":
        {
            "summary":"Wakadoo wakadoo wakadoo",
            "notes":"I am loving this",
            "headline":"Mitchell's house",
            "method":"through the front door"
        },
        "taxonomy":
        {
            "type":"medical",
            "subtypes":
                [
                    "Mental Health",
                    "Emergency Medicine (Western) ",
                    "Trans*"
                ]
        },
        "details":
            [
                "foo"
            ],
        "subtypeChosen":
            [
                "Mental Health",
                "Emergency Medicine (Western) ",
                "Trans*"
            ]
    },
    "place":
    {
        "coordinates":
        {
            "lat":40.758895,
            "lng":-73.98513100000002
        },
        "name":"",
        "address":"Times Square, Manhattan , NY 10036,USA" ,
        "notes":"nice indeed",
        "description":"very nice"
    },
    "time":
    {
        "schedules":
            [

                {
                    "repeating":false,
                    "id":1,
                    "allDay":false,
                    "start":"2015-04-07T20:00:00.000Z",
                    "end":"2015-04-07T21:00:00.000Z",
                    "__uiCalId":1,
                    "_id":"1",
                    "_start":"2015-04-07T20:00:00.000Z",
                    "_end":"2015-04-07T21:00:00.000Z",
                    "className":
                        [

                        ]
                },

                {
                    "repeating":false,
                    "id":1,
                    "allDay":false,
                    "start":"2015-04-08T11:30:00.000Z",
                    "end":"2015-04-08T12:00:00.000Z",
                    "__uiCalId":2,
                    "_id":"1",
                    "_start":"2015-04-08T11:30:00.000Z",
                    "_end":"2015-04-08T12:00:00.000Z",
                    "className":
                        [

                        ]
                },

                {
                    "repeating":false,
                    "id":1,
                    "allDay":false,
                    "start":"2015-04-07T12:30:00.000Z",
                    "end":"2015-04-07T13:00:00.000Z",
                    "__uiCalId":3,
                    "_id":"1",
                    "_start":"2015-04-07T12:30:00.000Z",
                    "_end":"2015-04-07T13:00:00.000Z",
                    "className":
                        [

                        ]
                }
            ],
        "notes":""
    }
};


var floopyTwo = {"thing":{"description":{"summary":"quackadacka doo","notes":"bs","headline":"macarena mania","method":"boo"},"taxonomy":{"type":"medical","subtypes":["General Medicine (Western) ","Emergency Medicine (Western) "]},"details":["flargen"]},"place":{"coordinates":{"lat":40.758895,"lng":-73.98513100000002},"name":"","address":"Times Square, Manhattan, NY 10036, USA","notes":"mlarken","description":"oorgen"},"time":{"schedules":[{"repeating":false,"id":1,"allDay":false,"start":"2015-04-08T13:00:00.000Z","end":"2015-04-08T13:30:00.000Z","__uiCalId":1,"_id":"1","_start":"2015-04-08T13:00:00.000Z","_end":"2015-04-08T13:30:00.000Z","className":[]},{"repeating":false,"id":1,"allDay":false,"start":"2015-04-09T14:30:00.000Z","end":"2015-04-09T15:00:00.000Z","__uiCalId":2,"_id":"1","_start":"2015-04-09T14:30:00.000Z","_end":"2015-04-09T15:00:00.000Z","className":[]},{"repeating":false,"id":1,"allDay":false,"start":"2015-04-10T13:00:00.000Z","end":"2015-04-10T13:30:00.000Z","__uiCalId":3,"_id":"1","_start":"2015-04-10T13:00:00.000Z","_end":"2015-04-10T13:30:00.000Z","className":[]}],"notes":"floopy flop"}}

var requser = { "provider": "local", "username": "mcverter", "_id": "550cd2a5b377f6540f9f0a4a", "__v": "0", "created": "Fri Mar 20 2015 22:08:37 GMT-0400 (EDT)", "roles": "[ 'user' ]", "email": "mitchell@moo.com" }
var fromServer =  {
    "_id": "552550a1e46198201caf3187",
        "updated": "2015-04-08T16:00:33.393Z",
        "created": "2015-04-08T16:00:33.393Z",
        "time": {
        "schedules": []
    },
    "thing": {
        "taxonomy": {
            "details": [],
                "subtypes": []
        }
    }
}


var fromServer2 = {
    _id: '5526bb38f87de5640dd1432f',
    updated: 'Thu Apr 09 2015 13:47:36 GMT-0400 (EDT)',
    created: 'Thu Apr 09 2015 13:47:36 GMT-0400 (EDT)',
    time: { notes: '', schedules: [ {} ] },
place:
{ name: '',
    address: 'Times Square, Manhattan, NY 10036, USA',
    notes: 'flark',
    coordinates: { lat: 40.758895, lng: -73.98513100000002 } },
thing:
{ taxonomy: { type: 'food', details: [], subtypes: [Object] },
    description:
    { summary: 'floop',
        notes: 'mook',
        headline: 'foop',
        method: 'glarp' } } }
