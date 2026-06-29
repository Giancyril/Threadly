import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import cloudinary from "../config/cloudinary.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const images = [
  {
    path: "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\d4625ff1-8518-4eef-addb-e7c995d90a16\\media__1782696299177.jpg",
    content: "Can't wait for Toy Story 5! 🧸🚀 Woody and Buzz are back!"
  },
  {
    path: "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\d4625ff1-8518-4eef-addb-e7c995d90a16\\media__1782696299279.jpg",
    content: "Lunch is served! Feasting on some incredible paella and local dishes today. 🥘🍤 #foodie"
  },
  {
    path: "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\d4625ff1-8518-4eef-addb-e7c995d90a16\\media__1782696299288.jpg",
    content: "Paradise found. Spending the afternoon relaxing on the beach. 🌴🌊☀️ #travel"
  }
];

const seed = async () => {
  try {
    await connectDB();
    
    // find a user to attribute these posts to
    let user = await User.findOne({});
    if (!user) {
      console.log("No users found in database. Creating a mock user 'twitter_master'...");
      user = await User.create({
        clerkId: "mock_clerk_id_12345",
        email: "master@twitter.com",
        firstName: "Twitter",
        lastName: "Master",
        username: "twitter_master",
        profilePicture: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
      });
    }
    
    console.log(`Seeding posts for user: ${user.username} (${user.firstName} ${user.lastName})`);

    for (const imgInfo of images) {
      if (!fs.existsSync(imgInfo.path)) {
        console.warn(`File not found: ${imgInfo.path}`);
        continue;
      }
      
      const fileBuffer = fs.readFileSync(imgInfo.path);
      const base64Image = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
      
      console.log(`Uploading ${path.basename(imgInfo.path)} to Cloudinary...`);
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
      });
      
      console.log(`Creating post with image URL: ${uploadResponse.secure_url}`);
      await Post.create({
        user: user._id,
        content: imgInfo.content,
        image: uploadResponse.secure_url
      });
    }

    console.log("Seeding completed successfully! 🎉");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seed();
