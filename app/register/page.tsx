"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../api/auth/appClient";

const Register = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ phone: "", email: "", password: "", password_confirmation: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/auth/register", formData);
            console.log("User registered:", response.data);

            router.push("/dashboard"); 
        } catch (error: any) {
            console.error("Registration error:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>ثبت‌نام</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="phone" placeholder="شماره تلفن" onChange={handleChange} required />
                <input type="email" name="email" placeholder="ایمیل (اختیاری)" onChange={handleChange} />
                <input type="password" name="password" placeholder="رمز عبور" onChange={handleChange} required />
                <input type="password" name="password_confirmation" placeholder="تأیید رمز عبور" onChange={handleChange} required />
                <button type="submit">ثبت‌نام</button>
            </form>
        </div>
    );
};

export default Register;
