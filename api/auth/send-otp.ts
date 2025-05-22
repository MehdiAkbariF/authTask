import type { NextApiRequest, NextApiResponse } from "next";
import apiClient from "./appClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "شماره تلفن یا ایمیل الزامی است." });
        }

        const response = await apiClient.post("/auth/send-otp", { username });

        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ message: error.response?.data || "خطای سرور" });
    }
}
