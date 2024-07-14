"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TelegramContact.module.scss";
import axios from 'axios'

interface iFormmTelegram {
  username: string;
  email: string;
  subject: string;
  description: string;
}
const TelegramContact = () => {
  const { register, handleSubmit } = useForm<iFormmTelegram>();

  const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;
  console.log(TOKEN);
  console.log(CHAT_ID);

  const messageModel = (data: iFormmTelegram) => {
    let messageTG = `Username: <b>${data.username}</b> \n`;
    messageTG += `Emaill Adress:<b> ${data.email}</b> \n`;
    messageTG += `Subject: <b> ${data.subject}</b> \n`;
    messageTG += `Description:<b> ${data.description}</b> \n`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<iFormmTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
		chat_id: CHAT_ID,
		parse_mode: "html",
		text: messageModel(data)
	});
  };
  return (
    <div className={scss.TelegramContact}>
      <div className="container">
        <div className={scss.content}>
          <h1>TelegramContact</h1>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <input
              placeholder="username"
              type="text"
              {...register("username", { required: true })}
            />
            <input
              placeholder="email"
              type="text"
              {...register("email", { required: true })}
            />
            <input
              placeholder="subject"
              type="text"
              {...register("subject", { required: true })}
            />
            <input
              placeholder="dexcription"
              type="text"
              {...register("description", { required: true })}
            />
            <button>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelegramContact;
