select row_to_json(shareable)
from shareable
where shareable.id = (
  SELECT id
  from shareable
  where shareable.s_name = 'Gristedes');
