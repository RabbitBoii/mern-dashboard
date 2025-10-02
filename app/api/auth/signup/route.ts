import { ConnectDB } from "@/config/db"
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        await ConnectDB()
        const body = await request.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email and password are required fields" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exist." },
                { status: 400 },
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPass,
        })

        const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                user: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                },
            },
            { status: 201 }
        )
    }
    // catch (error: any) {
    //     console.error("Signup Error: ", error);
    //     return NextResponse.json({
    //         error: error.message || "An interval server error occured"
    //     }, { status: 500 })
    // }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }

}