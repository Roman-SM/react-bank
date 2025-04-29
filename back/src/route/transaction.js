// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/User')
const { Transaction } = require('../class/Transaction')
const { Notification } = require('../class/Notification')

const eventType = {
  deposit: 'Receipt', // поповнення
  withdrawal: 'Sending', // списання
  sendUser: 'User',
  sendStripe: 'Stripe',
  sendCoinbace: 'Coinbace',
}

const users = {
  user1: {
    email: 'user@mail.com',
    password: '123QWEqwe',
  },
  user2: {
    email: 'admin@mail.com',
    password: '123QWEqwe',
  },
  user3: {
    email: 'developer@mail.com',
    password: '123QWEqwe',
  },
}

User.create(users.user1.email, users.user1.password)
User.create(users.user2.email, users.user2.password)
User.create(users.user3.email, users.user3.password)

router.post('/send', function (req, res) {
  const { senderEmail, recipientEmail, sum } = req.body

  if (!sum) {
    return res.status(400).json({
      message:
        'Потрібно передати всі дані для створення платежу',
    })
  }

  try {
    const senderUser = User.getByEmail(senderEmail)
    if (senderEmail === recipientEmail) {
      return res.status(400).json({
        message: 'Ви не можете надіслати платіж самі собі.',
      })
    }
    if (!senderUser) {
      return res.status(400).json({
        message: 'Відправник з таким e-mail не існує',
      })
    }
    if (senderUser.balance < sum) {
      return res.status(400).json({
        message: 'Недостатньо коштів для переказу',
      })
    }
    const recipientUser = User.getByEmail(recipientEmail)
    if (!recipientUser) {
      return res.status(400).json({
        message: 'Отримувач з таким e-mail не існує',
      })
    }
    Transaction.newWithdrawal(
      senderEmail,
      Number(sum),
      eventType.withdrawal,
      eventType.sendUser,
      senderUser.balance,
    )
    Transaction.newReceiving(
      recipientEmail,
      Number(sum),
      eventType.receiving,
      eventType.sendUser,
      recipientUser.balance,
    )

    User.withdrawal(senderUser, sum)

    Notification.newEvent(
      Notification.announcement,
      Notification.transfer,
      senderEmail,
    )
    Notification.newEvent(
      Notification.announcement,
      Notification.transfer,
      recipientEmail,
    )

    return res.status(200).json({
      message: 'Переказ здійснено успішно',
    })
  } catch (e) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/recive-coinbase', function (req, res) {
  const { sum, email } = req.body
  if (!sum) {
    return res.status(400).json({
      message:
        'Потрібно передати всі дані для створення платежу',
    })
  }
  try {
    const user = User.getByEmail(email)
    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким e-mail не існує',
      })
    }

    Transaction.newRecive(
      email,
      Number(sum),
      eventType.deposit,
      eventType.sendCoinbace,
      user.balance,
    )

    User.deposit(user, Number(sum))

    Notification.newEvent(
      Notification.announcement,
      Notification.depositCoinbase,
      email,
    )

    return res.status(200).json({
      message: 'Кошти були зараховані на ваш рахунок.',
    })
  } catch (e) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/recive-stripe', function (req, res) {
  const { sum, email } = req.body

  if (!sum) {
    return res.status(400).json({
      message:
        'Потрібно передати всі дані для створення платежу',
    })
  }
  try {
    const user = User.getByEmail(email)
    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким e-mail не існує',
      })
    }

    Transaction.newRecive(
      email,
      Number(sum),
      eventType.deposit,
      eventType.sendStripe,
      user.balance,
    )

    User.deposit(user, sum)

    Notification.newEvent(
      Notification.announcement,
      Notification.depositStripe,
      email,
    )

    return res.status(200).json({
      message: 'Кошти були зараховані на ваш рахунок.',
    })
  } catch (e) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.get('/balance', function (req, res) {
  try {
    const userEmail = req.headers.authorization

    const email = User.getByEmail(userEmail)
    if (!email) {
      return res.status(400).json({
        message: 'Користувач з таким Email не існує',
      })
    }
    const balance = email.balance

    return res.status(200).json({
      balance,
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/transactions-list', function (req, res) {
  try {
    const userEmail = req.headers.authorization

    const email = User.getByEmail(userEmail)
    if (!email) {
      return res.status(400).json({
        message: 'Користувач з таким Email не існує',
      })
    }
    const transactions =
      Transaction.getListByEmail(userEmail)

    return res.status(200).json({
      transactions: transactions.map(
        ({ id, date, sum, type, img, typeEvent }) => ({
          id,
          date,
          sum,
          type,
          typeEvent,
        }),
      ),
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/transaction-info', function (req, res) {
  try {
    const transactionId = req.headers.authorization
    if (!transactionId) {
      return res.status(400).json({
        message: 'Ви не передали ID транзакції',
      })
    }

    const transaction = Transaction.getById(
      Number(transactionId),
    )

    if (!transaction) {
      return res.status(400).json({
        message: 'Транзакції з таким ID не існує',
      })
    }

    return res.status(200).json({
      transaction: {
        id: transaction.id,
        date: transaction.date,
        email: transaction.email,
        sum: transaction.sum,
        type: transaction.type,
      },
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/notifications-list', function (req, res) {
  try {
    const userEmail = req.headers.authorization

    const email = User.getByEmail(userEmail)
    if (!email) {
      return res.status(400).json({
        message: 'Користувач з таким Email не існує',
      })
    }

    const notifications =
      Notification.getListByEmail(userEmail)

    return res.status(200).json({
      notifications: notifications.map(
        ({ id, date, type, text }) => ({
          id,
          date,
          type,
          text,
        }),
      ),
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

// Експортуємо глобальний роутер
module.exports = router
