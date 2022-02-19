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
