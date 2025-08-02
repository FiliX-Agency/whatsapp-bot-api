import { RequestHandler } from "express";
import { GroupService } from "../services/index.js";

export const getGroups: RequestHandler = async (req, res) => {
  try {
    const groups = await GroupService.getGroups();

    res.status(200).json(groups);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
