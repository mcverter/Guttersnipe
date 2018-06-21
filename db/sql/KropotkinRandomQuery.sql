SELECT k_paragraph as paragraph 
FROM kropotkin
OFFSET floor(random() * (select count(*)
                         from kropotkin))
LIMIT 1;
