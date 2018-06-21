SELECT json_agg(shareable_comment)
FROM (
       SELECT
         gu.id AS author_id,
         gu.u_name AS author_name,
         gu.u_role AS author_role,

         sc.id AS comment_id,
         sc.c_title AS comment_title,
         sc.c_text AS comment_text,
         sc.c_date_posted AS date_posted,
         sc.c_shareable_id AS shareable_id

       FROM shareable_comment sc
         INNER JOIN guttersnipe_user gu
           ON sc.c_user_id = gu.id
       WHERE sc.c_shareable_id = (
         SELECT id
         FROM shareable s
         WHERE s.s_name = 'Gristedes'))
  AS shareable_comment;
