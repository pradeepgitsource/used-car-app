import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);

        try {
            const res = await api.post("/auth/login", {
                username,
                password
            });
            // await new Promise(res => setTimeout(res, 100));
            // const res = await api.get("/auth/me");

            const role = res.data.role;
            sessionStorage.setItem("ROLE", role);

            navigate(role === "ADMIN" ? "/admin" : "/");

        } catch (err) {
            console.error(err);
            alert("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-6 rounded shadow w-80">

                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    className="bg-blue-600 text-white w-full py-2 rounded"
                    onClick={login}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </div>

        </div>
    );
}