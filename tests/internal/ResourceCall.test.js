import ResourceCall from '../../src/internal/ResourceCall';

/* ---------------------------------------------------------------------------------------------- *\
**                                   httpErrorParser — dedup path
**
** On the dedup/shadow path, an identical in-flight request short-circuits in `requestProcessor`
** before `preflightRequestUrl` is assigned. A deduped request that then errors (e.g. a 404) must
** still build a clean HTTP error payload instead of throwing a TypeError on `.toString()`.
\* ---------------------------------------------------------------------------------------------- */

const buildResourceCall = () => new ResourceCall({ errorParser: (error) => error });

const errorResponse = { ok: false, status: 404, statusText: 'Not Found' };

describe('ResourceCall#httpErrorParser', () => {
  it('does not throw and reports url: null when preflightRequestUrl is unset (dedup path)', () => {
    const resourceCall = buildResourceCall();
    // Simulate the dedup/shadow path: preflightRequestUrl was never assigned.
    expect(resourceCall.preflightRequestUrl).toBeUndefined();

    const error = resourceCall.httpErrorParser(errorResponse, { message: 'Resource missing' });

    expect(error.code).toBe(404);
    expect(error.status).toBe('not_found');
    expect(error.message).toBe('Resource missing');
    expect(error._request.url).toBeNull();
  });

  it('reports the request url when preflightRequestUrl is set (normal path)', () => {
    const resourceCall = buildResourceCall();
    resourceCall.preflightRequestUrl = new URL('http://example.test/resource/1');

    const error = resourceCall.httpErrorParser(errorResponse, { message: 'Resource missing' });

    expect(error._request.url).toBe('http://example.test/resource/1');
  });
});
