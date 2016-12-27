
import React, {PropTypes} from 'react';

const Shareable = (props) => (
/*    const rating = ;
*/
    <div>
        <ShareableHeading
            headline=props.headline
            summary=props.summary
            rating = {props.number_ratings ?
                props.total_ratings / props.number_ratings : 0}
            />
        <Thing
            thing=props.thing />
        <Space
            space=props.space />
        <Time
            time=props.time />
        <SummaryNotes
            notes=props.notes />
        <CommentList
            comments=props.comments />
    </div>

)


/*
 [
 {
 "headline" : "",
 "summary"  : "",
 "notes"    : "",
 "space"    : {
 "longitude" : "",
 "latitude": "",
 "canonical_address": "",
 "alternate_names": [
 ],
 "notes": ""
 },
 "time"    : {
 "notes" : "",
 "calendar" : {
 "events": [
 {
 "dt_start": "",
 "dt_end": "",
 "tz_id": "",
 "recurrence_rule" : {
 "freq": "",
 "byDay": "",
 "byMonthDay": "",
 "byYearDay": "",
 "byWeekNo": "",
 "byMonth": "",
 "until": "",
 "count": "",
 "interval": "",
 "bySetPos": ""
 }
 }
 ]
 }
 }
 }
 ]
 */