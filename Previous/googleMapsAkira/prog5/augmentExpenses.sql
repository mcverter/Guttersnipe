DROP FUNCTION IF EXISTS gauss;
DELIMITER //
CREATE FUNCTION gauss(mean float, stdev float) RETURNS int
BEGIN
set @x=rand(), @y=rand();
set @gaus = ((sqrt(-2*log(@x))*cos(2*pi()*@y))*stdev)+mean;
set @gausInt = CONVERT (@gaus, SIGNED);
return @gausInt;
END
//
DELIMITER ;


Alter Table SampleData drop column expense;
Alter Table SampleData add column expense int ;

Update SampleData set expense =
        CASE 
            WHEN type='museum' then gauss(40, 12)
            WHEN type='historic_site' then gauss(35, 10)
            WHEN type='information' then gauss(30, 8)
            WHEN type='shop' then gauss(100, 30)
            WHEN type='eatery' then gauss(80, 25)
	 END
	
