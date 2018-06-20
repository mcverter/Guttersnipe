select json_agg(shareable_comment)
from (
       select
         gu.id as authorId,
         gu.u_name as authorName,
         gu.u_role as authorRole,

         sc.id as commentId,
         sc.c_title as commentTitle,
         sc.c_text as commentText,
         sc.c_date_posted as datePosted,
         sc.c_shareable_id as shareableId

       from shareable_comment sc
         inner join guttersnipe_user gu
           on sc.c_user_id = gu.id
       where sc.c_shareable_id = (
         SELECT id
         from shareable s
         where s.s_name = 'Gristedes'))
  as shareable_comment;
