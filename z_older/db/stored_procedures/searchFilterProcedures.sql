
/* space search */
CREATE OR REPLACE FUNCTION search_from_center(
  longitude FLOAT,
  latitude FLOAT,
  distance INT
)
  RETURNS TABLE (id INT) AS
$$
SELECT shareable.id FROM shareable, space
WHERE space_id = space.id
      AND ST_DWithin((select ST_PointFromText('POINT(' || longitude || ' ' || latitude || ')', 7483)),
                     space.position, distance);
$$
LANGUAGE 'sql' STABLE;

CREATE OR REPLACE FUNCTION search_by_type(
  type_name TEXT
)
  RETURNS TABLE (id INT) AS
$$
select shareable.id from thing, shareable, main_type
where shareable.thing_id = thing.id
      AND thing.main_type_id = main_type.id
      AND main_type.name = type_name
$$
LANGUAGE 'sql' STABLE;

CREATE OR REPLACE FUNCTION search_by_subtype(
  subtype_list TEXT)
  RETURNS TABLE (id INT) AS
$$
select shareable.id from thing, shareable
WHERE shareable.thing_id = thing.id AND
      thing.id IN (select thing.id FROM thing, thing_subtype_association, subtype where
        thing.id = thing_subtype_association.thing_id
        and thing_subtype_association.subtype_id = subtype.id
        and subtype.name = subtype_list)
$$
LANGUAGE 'sql' STABLE;

CREATE OR REPLACE FUNCTION search_by_tag(
  tag_list TEXT
)
  RETURNS TABLE (id INT) AS
$$
select shareable.id from thing, shareable
WHERE shareable.thing_id = thing.id AND
      thing.id in (select thing.id FROM thing, thing_tag_association, tag where
        thing.id = thing_tag_association.thing_id
        and thing_tag_association.tag_id = tag.id
        and tag.name = tag_list)
$$
LANGUAGE 'sql' STABLE;

CREATE OR REPLACE FUNCTION search_by_date(date_input DATE)
  RETURNS TABLE (id INT) AS
$$
with  non_recurring_events AS (SELECT id, dt_start, dt_end FROM event
WHERE recurrence_rule_id is NOT NULL),
    recurring_events AS (SELECT id, dt_start, dt_end, recurrence_rule_id FROM event
  WHERE recurrence_rule_id is NOT NULL)
select shareable.id from shareable, time,non_recurring_events, calendar
where date_input <= non_recurring_events.dt_end and
      date_input >= non_recurring_events.dt_start
UNION

SELECT
  shareable.id from shareable, time, calendar,  recurrence_rule, recurring_events
where
  shareable.time_id = time.id AND
  time.calendar_id = calendar.id
  AND
  recurring_events.recurrence_rule_id = recurrence_rule.id
  AND
  recurring_events.recurrence_rule_id = recurrence_rule.id AND
  recurrence_rule."byDay" LIKE  ('%' || lower(substring(to_char(date_input, 'day'), 1, 2)) || '%')
$$
LANGUAGE 'sql' STABLE;
