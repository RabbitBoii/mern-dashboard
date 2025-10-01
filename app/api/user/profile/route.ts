import { ConnectDB } from "@/config/db";
import { getUserData } from "@/lib/getData";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await ConnectDB();

        const userID = getUserData(request);

        const user = await User.findById(userID).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 },
            )
        }

        return NextResponse.json({
            message: "User profile fetched successfully",
            data: user,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 })
    }
}

export async function PUT(request: NextRequest) {

    try {
        await ConnectDB();

        const userId = getUserData(request);

        const body = await request.json();
        const { username } = body;

        if (!username) {
            return NextResponse.json({ error: "Username is required!" }, { status: 400 })
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username: username },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found." }, { status: 404 })
        }

        return NextResponse.json({
            message: "Profile updated successfully.",
            data: updatedUser,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}