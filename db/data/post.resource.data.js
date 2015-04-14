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

var fumm = {"thing":{"description":{"summary":"mitchell","notes":"mitchell","headline":"mitchell","method":"mitchell"},"taxonomy":{"type":"food","subtypes":["Dumpster"]},"details":["foo"]},"place":{"coordinates":{"lat":40.758895,"lng":-73.98513100000002},"name":"","address":"Times Square, Manhattan, NY 10036, USA","notes":"","description":"moo"},"time":{"schedules":[{"start":"2015-04-13T17:00:00.000Z","end":"2015-04-13T17:30:00.000Z"},{"start":"2015-04-16T17:00:00.000Z","end":"2015-04-16T17:30:00.000Z"}],"notes":""}}
var bumm = {"thing":{"description":{"summary":"It's just a cafe for stuff and stuff","notes":"nothing really","headline":"cafe madeline","method":"go to the walk for a bit"},"taxonomy":{"type":"food","subtypes":["Food Not Bombs"]},"details":[]},"place":{"coordinates":{"lat":40.758895,"lng":-73.98513100000002},"name":"","address":"Times Square, Manhattan, NY 10036, USA","notes":"","description":"times square is times square"},"time":{"schedules":[{"start":"2015-04-13T16:00:00.000Z","end":"2015-04-13T16:30:00.000Z"},{"start":"2015-04-17T15:30:00.000Z","end":"2015-04-17T16:00:00.000Z"}],"notes":"forlorn"}}
var foom = [
    {
        "_id": "552c12f7c065d1510d8561dd",
        "__v": 0,
        "updated": "2015-04-13T19:03:19.207Z",
        "created": "2015-04-13T19:03:19.207Z",
        "time": {
            "notes": "",
            "schedules": [
                {
                    "start": "2015-04-14T16:30:00.000Z",
                    "end": "2015-04-14T17:00:00.000Z",
                    "_id": "552c12f7c065d1510d8561df"
                },
                {
                    "start": "2015-04-17T16:30:00.000Z",
                    "end": "2015-04-17T17:00:00.000Z",
                    "_id": "552c12f7c065d1510d8561de"
                }
            ]
        },
        "place": {
            "address": "Times Square, Manhattan, NY 10036, USA",
            "notes": "",
            "description": "thus and so",
            "coordinates": {
                "lat": 40.758896,
                "lng": -73.98513
            }
        },
        "thing": {
            "taxonomy": {
                "type": "food",
                "details": [],
                "subtypes": [
                    "Food Not Bombs"
                ]
            },
            "description": {
                "summary": "so and so",
                "notes": "yes and no",
                "headline": "such and such",
                "method": "thus and so"
            }
        }
    },
    {
        "_id": "552c0ee346534d360b62e653",
        "__v": 0,
        "updated": "2015-04-13T18:45:55.161Z",
        "created": "2015-04-13T18:45:55.161Z",
        "time": {
            "notes": "forlorn",
            "schedules": [
                {
                    "start": "2015-04-13T16:00:00.000Z",
                    "end": "2015-04-13T16:30:00.000Z",
                    "_id": "552c0ee346534d360b62e655"
                },
                {
                    "start": "2015-04-17T15:30:00.000Z",
                    "end": "2015-04-17T16:00:00.000Z",
                    "_id": "552c0ee346534d360b62e654"
                }
            ]
        },
        "place": {
            "address": "Times Square, Manhattan, NY 10036, USA",
            "notes": "",
            "description": "times square is times square",
            "coordinates": {
                "lat": 40.758896,
                "lng": -73.98513
            }
        },
        "thing": {
            "taxonomy": {
                "type": "food",
                "details": [],
                "subtypes": [
                    "Food Not Bombs"
                ]
            },
            "description": {
                "summary": "It's just a cafe for stuff and stuff",
                "notes": "nothing really",
                "headline": "cafe madeline",
                "method": "go to the walk for a bit"
            }
        }
    },
    {
        "_id": "552bf636317f640c126679d7",
        "__v": 0,
        "updated": "2015-04-13T17:00:38.833Z",
        "created": "2015-04-13T17:00:38.833Z",
        "time": {
            "notes": "",
            "schedules": [
                {
                    "start": "2015-04-13T17:00:00.000Z",
                    "end": "2015-04-13T17:30:00.000Z",
                    "_id": "552bf636317f640c126679d9"
                },
                {
                    "start": "2015-04-16T17:00:00.000Z",
                    "end": "2015-04-16T17:30:00.000Z",
                    "_id": "552bf636317f640c126679d8"
                }
            ]
        },
        "place": {
            "address": "Times Square, Manhattan, NY 10036, USA",
            "notes": "",
            "description": "moo",
            "coordinates": {
                "lat": 40.758896,
                "lng": -73.98513
            }
        },
        "thing": {
            "taxonomy": {
                "type": "food",
                "details": [],
                "subtypes": [
                    "Dumpster"
                ]
            },
            "description": {
                "summary": "mitchell",
                "notes": "mitchell",
                "headline": "mitchell",
                "method": "mitchell"
            }
        }
    },
    {
        "_id": "552bde6fceaba3750c9f335e",
        "__v": 0,
        "updated": "2015-04-13T15:19:11.283Z",
        "created": "2015-04-13T15:19:11.283Z",
        "time": {
            "notes": "",
            "schedules": [
                {
                    "recurrenceType": "A",
                    "start": "2015-04-12T22:00:00.000Z",
                    "end": "2015-04-12T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3364"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-13T22:00:00.000Z",
                    "end": "2015-04-13T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3363"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-14T22:00:00.000Z",
                    "end": "2015-04-14T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3362"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-15T22:00:00.000Z",
                    "end": "2015-04-15T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3361"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-16T22:00:00.000Z",
                    "end": "2015-04-16T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3360"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-17T22:00:00.000Z",
                    "end": "2015-04-17T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f335f"
                }
            ]
        },
        "place": {
            "address": " 104 Front St Brooklyn, NY 11201",
            "notes": "Large black bags out front.",
            "coordinates": {
                "lat": 40.702393,
                "lng": -73.98872
            }
        },
        "thing": {
            "taxonomy": {
                "type": "food",
                "details": [],
                "subtypes": [
                    "dumpster"
                ]
            },
            "description": {
                "headline": " La Bagel Delight",
                "summary": "Plenty of fresh, soft and delicious bagels of all varieties. Some sweets like scones and croissants, and a few sandwiches too. "
            }
        }
    },
    {
        "_id": "552bde6fceaba3750c9f335d",
        "__v": 0,
        "updated": "2015-04-13T15:19:11.280Z",
        "created": "2015-04-13T15:19:11.280Z",
        "time": {
            "notes": "time. *When:* Lately (fall 2012), usually not until about midnight; sometimes earlier.",
            "schedules": []
        },
        "place": {
            "address": " 130 Court St Brooklyn, NY 11201",
            "notes": "On the south side of Atlantic Avenue near Court St in big dumpsters.",
            "coordinates": {
                "lat": 40.689613,
                "lng": -73.99243
            }
        },
        "thing": {
            "taxonomy": {
                "type": "food",
                "details": [],
                "subtypes": [
                    "dumpster"
                ]
            },
            "description": {
                "summary": " Dumpster divers from all 4 boroughs have been known to make the trip. On some nights TJs puts out upwards of 6 dumpsters, at least half of which are filled top to bottom with quality food. Sometimes the scene gets weirdly competitive, with dumpster divers seeming to forget that the area is packed with other wasteful stores.Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags.",
                "headline": "Trader Joe's",
                "method": "On the south side of Atlantic Avenue near Court St in big dumpsters.",
                "notes": "Be forewarned, the initial reaction of this store’s management was to have the police ticket dumpster divers for trespass or littering"
            }
        }
    },
    {
        "_id": "552bde6fceaba3750c9f3356",
        "__v": 0,
        "updated": "2015-04-13T15:19:11.254Z",
        "created": "2015-04-13T15:19:11.253Z",
        "time": {
            "notes": "8:45 when all the employees leave the store. Trash is collected between 10:30 p and 12:30a. One source says nothing is out on Saturdays.",
            "schedules": [
                {
                    "recurrenceType": "A",
                    "start": "2015-04-12T20:45:00.000Z",
                    "end": "2015-04-12T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f335c"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-13T20:45:00.000Z",
                    "end": "2015-04-13T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f335b"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-14T20:45:00.000Z",
                    "end": "2015-04-14T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f335a"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-15T20:45:00.000Z",
                    "end": "2015-04-15T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3359"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-16T20:45:00.000Z",
                    "end": "2015-04-16T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3358"
                },
                {
                    "recurrenceType": "A",
                    "start": "2015-04-17T20:45:00.000Z",
                    "end": "2015-04-17T23:59:59.000Z",
                    "_id": "552bde6fceaba3750c9f3357"
                }
            ]
        },
        "place": {
            "address": "175 Remsen St Brooklyn, NY 11201",
            "notes": "Remsen St across from Borough Hall, between Court and Clinton Sts, Brooklyn",
            "coordinates": {
                "lat": 40.69348,
                "lng": -73.99138
            }
        },
        "thing": {
            "taxonomy": {
                "type": "food",
                "details": [],
                "subtypes": [
                    "dumpster"
                ]
            },
            "description": {
                "summary": " Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags.",
                "headline": "Perelandra",
                "method": "Regular curbside bags, plus cardboard boxes set to the side with most of the produce (what foragers don’t take gets composted)."
            }
        }
    }
]
