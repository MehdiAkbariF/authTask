"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../api/auth/appClient";

const VerifyOtp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", code: "" });
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sentPhone = localStorage.getItem("sentPhone");
        if (!sentPhone || formData.username !== sentPhone) {
            setErrors(["خطا: شماره وارد شده با شماره ارسال شده تطابق ندارد!"]);
            return;
        }

        try {
            const response = await apiClient.post("/auth/verify-otp", formData);
            console.log("OTP verified:", response.data);

            // بررسی وضعیت ثبت‌نام
            const existResponse = await apiClient.post("/auth/check-exists", { username: sentPhone });
            console.log("Exist check response:", existResponse.data);

            if (existResponse.data.exists) {
                router.push("/dashboard"); 
                return;
            }

            router.push("/register"); 
        } catch (error: any) {
            const errorMessages = error.response?.data.errors
                ? Object.values(error.response.data.errors).flat()
                : [error.response?.data.message || "خطای نامشخص"];
            setErrors(errorMessages);
        }
    };

    return (
        <div>
            <h2>تأیید کد OTP</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="ایمیل یا شماره تلفن" onChange={handleChange} required />
                <input type="text" name="code" placeholder="کد OTP" onChange={handleChange} required />
                <button type="submit">تأیید</button>
            </form>

            {/* نمایش خطاها */}
            <div className="error-container">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index} style={{ color: "red" }}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default VerifyOtp;
