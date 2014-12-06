/**
 *
 * An array of up to seven daily events,
 * Each of which has
 *   (1) DateTime,
 *   (2) Duration,
 *   (3) Repeating
 *
 *  @type {{dailys: {day: Date, duration: (Number|*|Function), repeating: (Boolean|*|Function)}[]}[]}
 */
$timeSchema =
    [{dailys: [ {day: Date, duration: Number, repeating: Boolean} ] }];

