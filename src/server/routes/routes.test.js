const request = require("supertest");
const app = require("../app");

describe('Routes', function(){
  describe('Home Route', ()=>{
    it("should respond to the GET method with 404", (done) => {
      request(app).get('/').then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });
  });
  describe('Shareables Route', ()=>{
    it("should respond to the GET method", (done) => {
      request(app).get('/api/shareables').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  describe('Random Kropotkins Route', ()=>{
    it("should respond to the GET method", (done) => {
      request(app).get('/api/kropotkins/random').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

});
