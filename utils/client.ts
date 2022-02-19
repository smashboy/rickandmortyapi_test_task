export async function fetchHelper(
  urlSring: string,
  params: Array<{ key: string; value: string }> = []
) {
  const url = new URL(urlSring);

  for (const parameter of params) {
    url.searchParams.append(parameter.key, parameter.value);
  }

  const res = await fetch(url.toString());

  return res.json();
}
