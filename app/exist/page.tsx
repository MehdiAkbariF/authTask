"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../api/auth/appClient";

const ExistCheck = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            localStorage.setItem("sentPhone", username);

            const response = await apiClient.post("/auth/check-exists", { username });
            console.log("Exist check response:", response.data);

            router.push("/sendOtp");
        } catch (error: any) {
            console.error("Exist check error:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="bg-green-500 flex justify-center items-center h-screen
        "dir="rtl">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input type="text" name="username" placeholder="شماره تلفن یا ایمیل" onChange={(e) => setUsername(e.target.value)} required
                className="p-2 border-2 " />
                <button type="submit" className="bg-green-200 p-3 rounded-full
                cursor-pointer hover:bg-green-900 duration-300">بررسی ثبت‌نام</button>
            </form>
        </div>
    );
};

export default ExistCheck;
