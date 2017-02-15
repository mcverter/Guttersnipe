/* using named parameters
SELECT concat_lower_or_upper(a := 'Hello', b := 'World', uppercase := true); */

CREATE OR REPLACE FUNCTION search_with_all_filters(
  time_filter BOOL,
  space_filter BOOL,
  thing_filter BOOL,
  longitude FLOAT,
  latitude FLOAT,
  distance INT,
  type_name TEXT,
  subtype_list TEXT,
  tag_list TEXT,
  date_input DATE
)
  RETURNS TABLE(id INT) AS
$$
SELECT shareable.id FROM
  shareable, space,
  thing, thing_subtype_association, main_type, subtype, tag, thing_tag_association,
  calendar_event_association, event, time, calendar, recurrence_rule
WHERE TRUE
      AND                           /* location filter */
      (space_filter is FALSE OR
       (space_id = space.id
        AND ST_DWithin((select ST_PointFromText('POINT(' || longitude || ' ' || latitude || ')', 7483)),
                       space.position, distance)))
      AND                           /* type filter */
      (thing_filter is FALSE OR
       (shareable.thing_id = thing.id
        AND thing.main_type_id = main_type.id
        AND main_type.name = type_name))
      AND                           /* subtype filter */
      (thing_filter is FALSE OR
       (shareable.thing_id = thing.id AND
        thing.id IN (select thing.id FROM thing, thing_subtype_association, subtype where
          thing.id = thing_subtype_association.thing_id
          and thing_subtype_association.subtype_id = subtype.id
          and subtype.name = subtype_list)))
      AND                           /* tag filter */
      (thing_filter is FALSE OR
       (shareable.thing_id = thing.id AND
        thing.id in (select thing.id FROM thing, thing_tag_association, tag where
          thing.id = thing_tag_association.thing_id
          and thing_tag_association.tag_id = tag.id
          and tag.name = tag_list)))
      AND                           /* events filter (non-recurring) */
      (time_filter is FALSE OR
       event.recurrence_rule_id is NULL OR
       (date_input <= event.dt_end and
        date_input >= event.dt_start))
      AND                           /* events filter (recurring) */
      (time_filter is FALSE OR
       event.recurrence_rule_id is NOT NULL OR
       (shareable.time_id = time.id AND
        time.calendar_id = calendar.id AND
        event.recurrence_rule_id = recurrence_rule.id AND
        event.recurrence_rule_id = recurrence_rule.id AND
        recurrence_rule."byDay" LIKE  ('%' || lower(substring(to_char(date_input, 'day'), 1, 2)) || '%')))
$$
LANGUAGE 'sql' STABLE;

