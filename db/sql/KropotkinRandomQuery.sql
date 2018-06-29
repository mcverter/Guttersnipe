SELECT paragraph
FROM kropotkin
OFFSET floor(random() * (select count(*)
                         from kropotkin))
LIMIT 1;
