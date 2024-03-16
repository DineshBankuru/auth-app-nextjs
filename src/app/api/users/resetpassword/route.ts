import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { ObjectId } from "mongodb";

connect();

export async function POST(request: NextRequest) {
  try {
    // console.log("Hi");
    const reqBody = await request.json();
    // console.log(reqBody);
    const { userId, password } = reqBody;
    // console.log("Hi");
    console.log(userId);
    // let uId = new ObjectId(userId);

    const user = await User.findById({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
    console.log(user);
    // console.log(user.isVerified);
    // if (user.isVerified) {
    //   return NextResponse.json({
    //     message: "Email already verified",
    //     success: true,
    //   });
    // }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({
      message: "Password Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
