SELECT json_agg(shareable_comment)
FROM (
       SELECT
         gu.id AS author_id,
         gu.name AS author_name,
         gu.role AS author_role,

         sc.id AS comment_id,
         sc.title AS comment_title,
         sc.text AS comment_text,
         sc.date_posted AS date_posted,
         sc.shareable_id AS shareable_id

       FROM shareable_comment sc
         INNER JOIN guttersnipe_user gu
           ON sc.user_id = gu.id
       WHERE sc.shareable_id =  $1)
  AS shareable_comment;
