import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  const { category_id, event_title } = await request.json();

  const { data: profiles, error: profilesError } = await supabaseAdmin
    .from("profiles")
    .select("id, username, full_name, category_id")
    .eq("category_id", category_id);

  if (profilesError) {
    console.error("Error fetching profiles:", profilesError);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }

  if (!profiles || profiles.length === 0) {
    console.log("No users in this category.");
    return NextResponse.json({ success: true, message: "No users to notify." });
  }

  const { data: authUsersData, error: authError } =
    await supabaseAdmin.auth.admin.listUsers();

  if (authError) {
    console.error("Error fetching auth users:", authError);
    return NextResponse.json(
      { error: "Failed to fetch user emails" },
      { status: 500 }
    );
  }

  const emailMap = new Map(authUsersData.users.map((u) => [u.id, u.email]));

  for (const user of profiles) {
    const email = emailMap.get(user.id);
    if (!email) continue;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🚨 New Event Posted in Your Category",
      html: `<p>Hi ${user.full_name ?? user.username ?? "there"},</p>
             <p>A new event titled <strong>${event_title}</strong> was posted in your category.</p>
             <p>Check it out in the app!</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    } catch (emailError) {
      console.error(`Failed to send email to ${email}:`, emailError);
    }
  }

  return NextResponse.json({ success: true });
}
