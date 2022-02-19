import type { NextApiRequest, NextApiResponse } from "next";
import { getCharactersPaginated } from "integrations/rickmortyapi/characters";

export default async function getCharactersPaginatedRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page, filter } = req.query;

    const parsedPage = parseInt(page as string);

    if (Number.isNaN(parsedPage)) return res.status(400).json({ message: "Invalid query" });

    const data = await getCharactersPaginated(parsedPage, filter as string);

    res.status(200).json({ ...data.data });
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error) });
  }
}
