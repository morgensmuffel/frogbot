import TelegramBot from 'node-telegram-bot-api';

import _ from "lodash"

// replace the value below with the Telegram token you receive from @BotFather
import { token } from './secret.js';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg)
    // bot.sendMessage(chatId, _.random(1, 3));
    const indexOfPhoto = _.random(0, 2);
    const arrOfUrl = [
        'https://i.pinimg.com/280x280_RS/9c/9d/22/9c9d22da39db636a7a93d7a58387805e.jpg',
        'https://static10.tgstat.ru/channels/_0/28/2831e0499d886cdfdf59be7f85d75aba.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfCjHd0en_agBHIpsAvJ_3-fJHnFfhri1pl8PZcZD846ig-4Kf_PtoMRKGVfVPorgk9-Y&usqp=CAU'   
    ];

    bot.sendPhoto(chatId, arrOfUrl[indexOfPhoto]);
});

  