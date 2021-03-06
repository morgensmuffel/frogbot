import TelegramBot from 'node-telegram-bot-api';
import _ from "lodash"
import { token } from './secret';
import axios from 'axios';

const bot = new TelegramBot(token, {polling: true});

const arrQuestionToAnswer = [
    {
        'question': 'Привет',
        'answer': 'Привет, друг!'
    }, 
    {
        'question': 'Ква',
        'answer': 'Ква!'
    },
    {
        'question': 'Как дела?',
        'answer': 'Хорошо, друг. А у тебя?'
    },
    {
        'question': 'Что делаешь?',
        'answer': 'Открываю для себя что-то новое.'
    },
    {
        'question': 'Что ты умеешь?',
        'answer': 'Очень мало чего. Я молодой бот.'
    },
    {
        'question': 'Опрос',
        'answer': 'Кто из них?',
        'option': {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            'text': 'Жабки',
                            'callback_data': '1'
                        }
                    ],
                    [
                        {
                            'text': 'Котики',
                            'callback_data': '2'
                        }
                    ],
                    [
                        {
                            'text': 'Лисята',
                            'callback_data': '3'
                        }
                    ]
                ]
            }
        }
    }
]

bot.on('callback_query', (query) => {
    if (query.data === '1') {
        bot.sendMessage(query.message.chat.id, 'Ты лягушонок')
    }
    if (query.data === '2') {
        bot.sendMessage(query.message.chat.id, 'Ты котёнок')
    }
    if (query.data === '3') {
        bot.sendMessage(query.message.chat.id, 'Ты лисёнок')
    }
} )

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const questionAndAnswer = arrQuestionToAnswer.find((el) => el['question'] === msg.text);
    if (questionAndAnswer) {
        bot.sendMessage(chatId, questionAndAnswer['answer'], questionAndAnswer.option)
    } else {
        // bot.sendMessage(chatId, 'Извини, я молодой бот. Могу чего-то не знать.')
        axios.get('https://api.thecatapi.com/v1/images/search').then(result => {
            bot.sendPhoto(chatId, result.data[0].url)
        })

    }
});