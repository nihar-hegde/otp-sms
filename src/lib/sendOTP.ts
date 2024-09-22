import { Vonage } from "@vonage/server-sdk";

// @ts-expect-error no clue why error here.
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY || "",
  apiSecret: process.env.VONAGE_API_SECRET || "",
});

export async function sendSMS(to: string, text: string) {
  const from = "Vonage APIs";

  try {
    const resp = await vonage.sms.send({ to, from, text });
    console.log("Message sent successfully");
    console.log(resp);
    return resp;
  } catch (err) {
    console.log("There was an error sending the messages.");
    console.error(err);
    throw err;
  }
}
