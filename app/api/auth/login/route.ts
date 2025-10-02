import { ConnectDB } from "@/config/db";
import User from "@/models/User";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await ConnectDB();

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required!" },
                { status: 400 },
            )
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 },
            )
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return NextResponse.json(
                { error: "Incorrect password." },
                { status: 401 },
            )
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        })

        const response = NextResponse.json(
            {
                message: "Login successful",
                success: true
            },
            { status: 200 },
        )

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 1,
            path: '/'
        })

        return response;
    }
    // catch (error: any) {
    //     console.error("Login error", error);
    //     return NextResponse.json(
    //         { error: error.message || "An internal server error occurred" },
    //         { status: 500 }
    //     )
    // }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }

}