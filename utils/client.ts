export async function fetchHelper<T>(
  url: string,
  params: Array<{ key: string; value: string | undefined }> = []
) {
  const searchParams = new URLSearchParams();

  for (const parameter of params) {
    if (parameter.value) searchParams.append(parameter.key, parameter.value);
  }

  const parsedUrl = `${url}?${searchParams.toString()}`;

  const res = await fetch(parsedUrl);

  return res.json() as Promise<T>;
}

export function stringifyValue(newValue: any) {
  let storageValue: string | null = null;

  if (typeof newValue === "string") {
    storageValue = newValue;
  } else {
    storageValue = JSON.stringify(newValue);
  }

  return storageValue;
}

export function formatUserFriendlyDate(date: Date) {
  // navigator.language

  return new Intl.DateTimeFormat("en-US", {
    // weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

async function cacheFetch(cacheName: string, key: string) {
  try {
    const cacheApi = self.caches;

    const request = new Request(key);
    const cache = await cacheApi.open(cacheName);
    const response = await cache.match(request);
    if (!response) return null;

    const blob = await response.blob();

    return new Blob([blob], { type: blob.type });
  } catch (err) {
    console.warn(err);
    return null;
  }
}

async function cacheSave(cacheName: string, key: string, data: Blob) {
  try {
    const cacheApi = self.caches;

    const cacheData = data;
    const request = new Request(key);

    const response = new Response(cacheData);
    const cache = await cacheApi.open(cacheName);

    await cache.put(request, response);
  } catch (err) {
    console.warn(err);
  }
}

export const cache = { fetch: cacheFetch, save: cacheSave };
