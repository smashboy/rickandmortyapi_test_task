import { getCharactersSelected } from "integrations/rickmortyapi/characters";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getCharactersPaginatedRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id;

    if (!(id instanceof Array) && typeof id !== "string")
      return res.status(400).json({ message: "Invalid query" });

    const ids =
      typeof id === "string"
        ? [parseInt(id)].filter((id) => !Number.isNaN(id))
        : id.map((id) => parseInt(id)).filter((id) => !Number.isNaN(id));

    const data = await getCharactersSelected(ids);

    if (data.status !== 200) return res.status(data.status).json({ message: data.statusMessage });

    const response = data.data instanceof Array ? data.data : [data.data];

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error) });
  }
}
