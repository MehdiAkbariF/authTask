"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../api/auth/appClient";

const SendOtp = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [exist, setExist] = useState(localStorage.getItem("sentPhone") || "");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sentPhone = localStorage.getItem("sentPhone") || ""; 

        if (!sentPhone) {
            console.error("خطا: شماره ذخیره شده در localStorage موجود نیست!");
            return;
        }

        try {
            const response = await apiClient.post("/auth/send-otp", { username: sentPhone });
            console.log("OTP sent:", response.data);

            localStorage.setItem("sentPhone", sentPhone); 
            router.push("/verifyOtp");
        } catch (error: any) {
            console.error("OTP error:", error.response?.data || error.message);
        }
    };
    
    return (
        <div>
            <h2>ارسال کد OTP</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="ایمیل یا شماره تلفن" onChange={(e) => setUsername(e.target.value)} value={localStorage.getItem("sentPhone") || ""} required />
                <button type="submit">ارسال کد</button>
            </form>
        </div>
    );
};

export default SendOtp;
