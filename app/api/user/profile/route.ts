import { ConnectDB } from "@/config/db";
import { getUserData } from "@/lib/getData";
import User from "@/models/User";
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