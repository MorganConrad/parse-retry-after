const test = require('tape');
const pre = require('../parse-retry-after');

function mockResponse(retryAfterValue) {
  return {
    headers: {
      get: function get(ignored) { return retryAfterValue; }
    }
  }
}

test("number", (t) => {
  let response = mockResponse('120');
  t.equal(pre(response), 120);
  response = mockResponse('0');
  t.equal(pre(response), 1);  // special - if they request a 0 second delay we say 1.
  t.end();
})

test("bad format",  (t) => {
  let response = mockResponse('foo');  // not a Date (probably shouldn't happen)
  t.throws(() => pre(response), Error);
  t.end();
})

test("not present", (t) => {
  let response = mockResponse(null);
  t.equal(pre(response), 0);   // response.headers has no Retry-After
  t.equal(pre(null), 0);       // response was null (probably shouldn't happen)
  t.equal(pre("foo"), 0);      // response has no .headers
  t.end();
})

test('future', (t) => {
  let plus2minutes = Date.now() + 120000;
  let response = mockResponse(new Date(plus2minutes).toUTCString());
  t.equal(pre(response), 120);  // TODO if test takes > 1 second this might fail
  t.end();
})

test('past', (t) => {
  let minus2minutes = Date.now() - 120000;
  let response = mockResponse(new Date(minus2minutes).toUTCString());
  t.equal(pre(response), 1);    // special case, 0 second delay -> 1 second
  t.end();
})


