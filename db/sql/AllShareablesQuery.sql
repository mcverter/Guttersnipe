select json_agg(shareables) from
(
select * from
shareable
)
as shareables;
