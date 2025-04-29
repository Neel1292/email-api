const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config(); // For environment variables

const PORT = parseInt(process.env.PORT) || 5787;
const recipients = ["prajapatidisha150407@gmail.com", "Nidhi.patel280912@gmail.com", "aayushipatel1586@gmail.com", "diyaparmar5170@gmail.com"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your Gmail email
        pass: process.env.PASSWORD, // Your App Password
    },
});

app.get("/", function(req, res) {
    res.send("Welcome to the Email Sender API");
})
app.post("/send-email", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    
    const mailOptions = {
        from: `Portfolio Contact <${process.env.FROM_EMAIL}>`, // User's email
        to: recipients.join(","), // Your Gmail
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        html: `
            <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 12px; 
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); font-family: Arial, sans-serif; 
                        background-color: #ffffff;">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #4A90E2, #007BFF); padding: 20px; 
                            border-radius: 10px 10px 0 0; text-align: center; color: #fff;">
                    <h2 style="margin: 0; font-size: 22px;">📩 New Contact Request</h2>
                </div>

                <!-- User Details -->
                <div style="padding: 20px;">
                    <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${name}</p>
                    <p style="font-size: 16px; color: #333;"><strong>Email:</strong> 
                        <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a>
                    </p>
                    <p style="font-size: 16px; color: #333;"><strong>Phone:</strong> ${phone}</p>
                </div>

                <!-- Message Section -->
                <div style="margin: 10px 20px; padding: 15px; background-color: #F0F4F8; 
                            border-left: 5px solid #007BFF; border-radius: 5px;">
                    <p style="margin: 0; font-size: 16px; color: #555;"><strong>Message:</strong></p>
                    <p style="margin: 5px 0; font-size: 14px; color: #333;">${message}</p>
                </div>

                <!-- Call to Action Button -->
                <div style="text-align: center; margin-top: 20px;">
                    <a href="mailto:${email}" 
                        style="display: inline-block; padding: 12px 24px; background-color: #007BFF; 
                                color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold;
                                box-shadow: 0 3px 6px rgba(0, 123, 255, 0.2); transition: 0.3s;">
                        📩 Reply to ${name}
                    </a>
                </div>

                <!-- Footer -->
                <div style="text-align: center; font-size: 12px; color: #888; margin-top: 30px; padding-top: 15px; 
                            border-top: 1px solid #ddd;">
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company. All Rights Reserved.</p>
                    <p style="margin-top: 5px;">
                        <a href="https://yourwebsite.com" style="color: #007BFF; text-decoration: none;">Visit our website</a> | 
                        <a href="https://www.linkedin.com/in/yourprofile" style="color: #007BFF; text-decoration: none;">LinkedIn</a>
                    </p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Message Sent Successfully");
    } catch (error) {
        console.error("Error: ", error);
        res.status(400).json({ success: false, message: "Something went wrong" });
    }
})

app.listen(PORT, () => { console.log("Server Running on Port", PORT) });