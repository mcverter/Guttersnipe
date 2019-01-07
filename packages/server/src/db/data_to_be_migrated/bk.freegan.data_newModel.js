let Brooklyn = [
  //     "updated":"2015-03-07T18:27:32.065Z",

  // April 12 = Sunday   "2015-04-13T18:27:00"
  // April 13 = Monday
  //Perelandra
  {
    thing: {
      taxonomy: { type: "food", subtypes: ["dumpster"] },
      description: {
        summary:
          " Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags.",
        headline: "Perelandra",
        method:
          "Regular curbside bags, plus cardboard boxes set to the side with most of the produce (what foragers don’t take gets composted)."
      }
    },
    place: {
      coordinates: {
        lat: 40.693483,
        lng: -73.991377
      },
      address: "175 Remsen St    Brooklyn, NY 11201",
      notes:
        "Remsen St across from Borough Hall, between Court and Clinton Sts, Brooklyn"
    },
    time: {
      schedules: [
        {
          recurrenceType: "A",
          start: "2015-04-13T04:45:00",
          end: "2015-04-13T06:59:59"
        }
      ],
      notes:
        "8:45 when all the employees leave the store. Trash is collected between 10:30 p and 12:30a. One source says nothing is out on Saturdays."
    }
  },
  {
    thing: {
      taxonomy: { type: "food", subtypes: ["dumpster"] },
      description: {
        summary:
          " Dumpster divers from all 4 boroughs have been known to make the trip. On some nights TJs puts out upwards of 6 dumpsters, at least half of which are filled top to bottom with quality food. Sometimes the scene gets weirdly competitive, with dumpster divers seeming to forget that the area is packed with other wasteful stores.Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags.",
        headline: "Trader Joe's",
        method:
          "On the south side of Atlantic Avenue near Court St in big dumpsters.",
        notes:
          "Be forewarned, the initial reaction of this store’s management was to have the police ticket dumpster divers for trespass or littering"
      }
    },
    place: {
      coordinates: {
        lat: 40.689613,
        lng: -73.99243
      },
      address: "  130 Court St  Brooklyn, NY 11201",
      notes:
        "On the south side of Atlantic Avenue near Court St in big dumpsters."
    },
    time: {
      schedule: [
        {
          recurrenceType: "E",
          start: "2015-04-12T6:00:00",
          end: "2015-04-13T09:00:00"
        }
      ],
      notes:
        "time. *When:* Lately (fall 2012), usually not until about midnight; sometimes earlier."
    }
  },
  {
    thing: {
      taxonomy: { type: "food", subtypes: ["dumpster"] },
      description: {
        headline: "  La Bagel Delight",
        summary:
          "Plenty of fresh, soft and delicious bagels of all varieties. Some sweets like scones and croissants, and a few sandwiches too. "
      }
    },
    place: {
      coordinates: {
        lat: 40.702392,
        lng: -73.98872
      },
      address: "  104 Front St  Brooklyn, NY 11201",
      notes: "Large black bags out front."
    },
    time: {
      schedules: [
        {
          recurrenceType: "A",
          start: "2015-04-13T04:00:00",
          end: "2015-04-13T06:59:59"
        },
        {
          recurrenceType: "A",
          start: "2015-04-14T04:00:00",
          end: "2015-04-14T06:59:59"
        }
      ],
      notes: ""
    }
  }
];

module.exports = {
  resources: Brooklyn
};
