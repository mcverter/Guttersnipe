SELECT routines.routine_name, parameters.data_type, parameters.ordinal_position
FROM information_schema.routines
    LEFT JOIN information_schema.parameters ON routines.specific_name=parameters.specific_name
WHERE routines.specific_schema='my_specified_schema_name'
ORDER BY routines.routine_name, parameters.ordinal_position;

/*
[2018-06-16 14:46:24] Run /Users/mitchell.verter/ComputerScienceMac/personal/guttersnipe/db/sql/FindFunctions.sql
[2018-06-16 14:46:24] Connecting to guttersnipeSimple@localhost...
[2018-06-16 14:46:24] Using batch mode (1000 insert/update/delete statements max)
SELECT routines.routine_name, parameters.data_type, parameters.ordinal_position
FROM information_schema.routines
LEFT JOIN information_schema.parameters ON routines.specific_name=parameters.specific_name
WHERE routines.specific_schema='...
[2018-06-16 14:46:24] completed in 11 ms
[2018-06-16 14:46:24] Summary: 1 of 1 statements executed in 55 ms (325 symbols in file)

 */