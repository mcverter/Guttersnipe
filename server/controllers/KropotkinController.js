import fs from 'fs';
import {Client} from 'pg';
import guttersnipeSimpleConfig from '../../config/dbConfig'

const client = new Client(guttersnipeSimpleConfig);
client.connect();

class KropotkinController {
  async selectRandomKropotkin() {
    const kropotkinRandomQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/KropotkinRandomQuery.sql', 'utf8');
    const kropotkinRandomQueryResult = await client.query(kropotkinRandomQueryFromFile);
    const kropotkinParagraph = kropotkinRandomQueryResult.rows[0].paragraph;
    console.log('k paragraph', kropotkinParagraph);
  }
}

module.exports = KropotkinController;

const kc = new KropotkinController();
kc.selectRandomKropotkin();
