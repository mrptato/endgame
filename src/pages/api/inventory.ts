import type { NextApiRequest, NextApiResponse } from "next";
import inventoryData from "../../data/inventory.json";
import { Product } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ products: Product[] } | { message: string }>
) {
  if (req.method === "GET") {
    // Simulate a slight delay to mimic real-world API call
    setTimeout(() => {
      res.status(200).json(inventoryData);
    }, 200);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
