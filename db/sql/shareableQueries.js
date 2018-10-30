const insertQuery = `
    INSERT INTO shareables
    (
    address,
    description,
    geolocation,
    icalendar,
    latitude,
    longitude
    name,
    subcategory,
    time
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    returning id
`;

module.exports = {
  insertQuery
};
