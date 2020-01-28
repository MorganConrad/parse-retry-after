
function calcRetryAfterSeconds(response) {
  if (!response || !response.headers)
    return 0;

  let headerSays = response.headers.get('retry-after');
  if (headerSays === null)
    return 0;

  let nval = Number(headerSays);
  if (Number.isFinite(nval))
    return nval || 1;

  let retryDateMS = Date.parse(headerSays);
  if (Number.isNaN(retryDateMS))
    throw Error('Unexpected Retry-After value: ' + headerSays);

  let deltaMS = retryDateMS - Date.now();
  return (deltaMS > 0) ? Math.ceil(deltaMS/1000) : 1;
}

export default calcRetryAfterSeconds;
