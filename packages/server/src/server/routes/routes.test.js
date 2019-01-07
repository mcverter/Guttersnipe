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
    it("should respond to the GET method", (done) => {
      request(app).get('/api/shareables').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("should return a non-empty array of shareables", (done) => {
      request(app).get('/api/shareables').then((response) => {
        const data = response.body.data;
        expect(typeof data).toBe("object");
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBeGreaterThan(0);
        done();
      });
    });
    describe("Shareable Item", () =>{
      it("should be a well-formed object", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(typeof shareable).toBe("object");
          done();
        });
      });
      it("must have an id", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.id).toBeDefined();
          done();
        });
      });
      it("must have a subcategory", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.subcategory).toBeDefined();
          done();
        });
      });
      it("must have a name", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.name).toBeDefined();
          done();
        });
      });
      it("must have a description", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.description).toBeDefined();
          done();
        });
      });
      it("must have an address", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.address).toBeDefined();
          done();
        });
      });
      it("must have a longitude", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.longitude).toBeDefined();
          done();
        });
      });
      it("must have a latitude", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.latitude).toBeDefined();
          done();
        });
      });
      it("must have a time", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.longitude).toBeDefined();
          done();
        });
      });
      it("may have a calendar", (done) => {
        request(app).get('/api/shareables').then((response) => {
          const shareable = response.body.data[0];
          expect(shareable.hasOwnProperty("icalendar")).toBeTruthy();
          done();
        });
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
    it("should respond with a paragraph of text", (done) => {
      request(app).get('/api/kropotkins/random').then((response) => {
        const data = response.body;
        const paragraph = data.paragraph;
        expect(typeof paragraph).toBe("string");
        expect(paragraph.length).toBeGreaterThan(3);
        done();
      });
    });
  });
});
