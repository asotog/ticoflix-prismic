// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "../../prismic";
import Prismic from "prismic-javascript";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = Client();
  const queryResults = await client.query([
    Prismic.Predicates.at("document.type", "movie"),
  ]);
  res.status(200).json(queryResults.results);
}
