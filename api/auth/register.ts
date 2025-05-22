import type { NextApiRequest, NextApiResponse } from "next";
import apiClient from "./appClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { phone, email, password, password_confirmation } = req.body;

        if (!phone || !password || !password_confirmation) {
            return res.status(400).json({ message: "شماره تلفن، رمز عبور و تأیید رمز عبور الزامی هستند." });
        }

        const response = await apiClient.post("/auth/register", {
            phone,
            email,
            password,
            password_confirmation,
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ message: error.response?.data || "خطای سرور" });
    }
}
