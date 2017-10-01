import { http, config } from '../src/dec-http';
config.base = 'http://jsonplaceholder.typicode.com';
class AnotherDummyTest {
  constructor(private callback: () => void) {}
  @http()
  public fetch (url: string, params?: any, error?, result?): void {
    expect(error).toBeNull();
    expect(result).toBeTruthy();
    expect(result instanceof Array);
    expect(result).toEqual(expect.arrayContaining([{
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    }]));
    this.callback();
  }
}
describe("http decorator test", () => {
  it("should perform `curl http://jsonplaceholder.typicode.com/todos`", (done) => {
    const dummyTest = new AnotherDummyTest(done);
    dummyTest.fetch('todos');
  })
})
