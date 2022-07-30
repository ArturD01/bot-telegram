const TelegramApi = require('node-telegram-bot-api')
const {gameIkon, angameIkon} = require('./options')
const token = '5575087374:AAFvUj5HnmgAy8H6kYii5I9IZGLN7iRrm8w'

const bot = new TelegramApi (token, {polling:true})

const chats ={}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Загадываю цифру, от 0 до 9')
    const random = Math.floor(Math.random()*10)
    chats[chatId] = random
    return bot.sendMessage(chatId, 'Отгадай', gameIkon)
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description:'Начало'},
        {command: '/no', description:'Шпион'},
        {command: '/info', description:'Cуть'},
        {command: '/game', description:'Игра'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    

        if(text === '/start') {
            return bot.sendMessage(chatId, `Этот бот собственность Артура`)
        }
         
        if(text === '/no'){
            return bot.sendMessage(chatId, `Всяким ${msg.from.first_name} ${msg.from.last_name} бота не украсть` )
        }
      
        if(text === '/info'){
        await bot.sendMessage(chatId, `Тебе хана, запалился. ID: ${chatId}. Нефиг было __${text}__ писать`);
        return bot.sendSticker(chatId, 'https://tgram.ru/wiki/stickers/img/krotok/png/1.png');
        }

        if(text === '/game'){
        return startGame(chatId);
        }

        return bot.sendMessage(chatId, `Я тебя не понял`)
    })
    

     bot.on('callback_query', async msg => {
          const data = msg.data;
          const chatId = msg.message.chat.id;

          if (data == '/again'){
            bot.sendMessage(chatId, "___________________")
            return startGame(chatId);
          }

          if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал число ${chats[chatId]}`, angameIkon)
          } else {
            return bot.sendMessage(chatId, `Не угадал, было загаданно число ${chats[chatId]}`, angameIkon)
          }

         
     })

}

start()