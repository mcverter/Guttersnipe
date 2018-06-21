function queryFromFileWithParameter(connection, filename, parameter) {
  connection.query(fs.readFileSync(filename),[parameter])
}
