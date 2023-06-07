import { supabase } from "./supabase.js";
import { redis } from "./redis.js";
import { transporter } from "./email.js";
import ejs from "ejs";

const opts = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        number: { type: "number" },
      },
    },
  },
};

export default async function register(fastify, options) {
  fastify.post("/register", opts, async (request, reply) => {
    const { data, error } = await supabase
      .from("registration")
      .insert(request.body)
      .select();

    if (error) {
      console.error(error);
      return { message: "Supabase Insert Error" };
    }
    await redis.connect();
    //await redis.set("registration", JSON.stringify(data));
    const value = await redis.get("registration");
    //console.log(value);
    const email = await ejs.render(value, data[0]);
    const mailOptions = {
      from: "community@htbsrmist.tech",
      to: data[0].email,
      subject: "Thank You for Registering",
      html: email,
    };
    await transporter.sendMail(mailOptions);
    await redis.disconnect();
    return { message: "Email sent" };
  });
}
