API Project Framework-
already created
https methods
1.informational response(100)
100-continue
101-switching protocols
102-processing
103-early hints

2.redirection response(2XX)
200-ok
201-created
202-accepted
204-no content

3.successful message(300)
300-multiple choices
301-moved permanently
302-found
303-see other
304-not modified
305-use proxy

4.client side response(400)
400-bad request
401-un-authorised
402-payment required
403-frobidden
404-not found
405-method not supported
429-too many request
409-conflict
422-unprocessible entity


5.server side response(500)
500-complete request
501-not implemented
502-bad gateway
503-service unavailable
504-gateway timeout
505-http version not supported
506-variant also nagotiates
507-insufficinet storage
508-loop detected
510-not extended
511-network authentication required



Api Methods
Get-retrieve content
2.post - create api
3.put-update
4.Delete-delete
5.patch-partial update

info imp
request
response
authorization
request payload
response payload
status code
error code
json


create account
--api--post--create--request payload

auth type
Api key
basic auth
bearer token
digest auth
hawk authentication
jwt bearer
oauth 1.0
oauth 2.0

variables in postman api
variable,collection,global

dev--(component testing by dev,highly unstable)-qa-stage env
# Playwright API Automation Framework

This project tests the Restful Booker API documented at
<https://restful-booker.herokuapp.com/apidoc/index.html> with JavaScript and
Playwright's API request fixture. It is API-only; browser binaries are not
required.

## Requirements

- Node.js 20 or newer
- npm
- Network access to the configured API

## Setup and run

```powershell
npm ci
npm run test:api
```

The suite runs sequentially against the shared public demo API. Booking tests
create uniquely named records and delete the records they create. To target a
different compatible environment, set `API_BASE_URL` before running:

```powershell
$env:API_BASE_URL = 'https://restful-booker.herokuapp.com'
npm run test:api
```

## Reports

Each test run writes:

- Playwright HTML report: `playwright-report/` (`npm run report:html`)
- Allure raw results: `allure-results/`

Generate and open the Allure report:

```powershell
npm run report:allure
npm run report:allure:open
```

## Project structure

```text
fixtures/       Shared Playwright API fixture
src/api/        Booking API client
test-data/      Reusable credentials and booking data factory
tests/          Separate API operation and behavior test cases
playwright.config.js
```

## API coverage

Coverage here means documented API behavior exercised by this suite, not source
line coverage of the remotely hosted service. `tests/booking-lifecycle.spec.js`
contains separate create, read, list/filter, PUT update, PATCH update, and delete
test cases. Separate tests also exercise successful and unsuccessful `POST
/auth`, `GET /ping`, and the not-found behavior for an unknown booking. Every
documented endpoint and documented list filter is represented: 100%
operation/filter coverage.

The API is a public demo service, so availability and external data changes can
affect test results. This project does not claim coverage of undocumented
validation behavior or server implementation code.

## Design notes

- API calls are centralized in `src/api/booking-api.js`; tests focus on behavior
  and response contracts.
- Request fixtures are isolated per test, and one worker avoids competing
  writes against the shared demo service.
- Credentials and payload builders live in `test-data/booking-data.js`.
- `API_BASE_URL` supports local or staging environments without changing code.
