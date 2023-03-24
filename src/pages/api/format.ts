// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { twig } from "@/utils/formatters";
import type { NextApiRequest, NextApiResponse } from "next";

interface IRequest extends NextApiRequest {
  body: {
    type: string;
    content: string;
  };
}

type IResponse =
  | {
      content: string;
    }
  | {
      error: {
        type: string;
        message: string;
      };
    };

const validateRequest = (req: IRequest) => {
  return (
    req.body !== undefined &&
    req.body.content !== undefined &&
    req.body.type !== undefined
  );
};

export default function handler(
  req: IRequest,
  res: NextApiResponse<IResponse>
) {
  if (req.method === "POST") {
    // if (!validateRequest(req)) {
    //   res.status(400).json({
    //     error: {
    //       type: "",
    //       message: "Bad Request",
    //     },
    //   });
    // }
    const { type, content } = req.body;

    if (type === "twig") {
      return res.status(200).json({ content: twig(content) });
    }
  }
}
