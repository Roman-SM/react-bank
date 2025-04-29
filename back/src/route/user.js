// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/User')
const { Confirm } = require('../class/Confirm')
const { Session } = require('../class/Sessions')
const { Notification } = require('../class/Notification')

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

router.post('/signup', function (req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message:
        'Потрібно передати всі дані для створення користувача',
    })
  }

  try {
    const user = User.getByEmail(email)
    if (user) {
      return res.status(400).json({
        message: 'Користувач з таким e-mail вже існує',
      })
    }

    const newUser = User.create(email, password)

    const session = Session.create(newUser)

    Confirm.create(newUser.email)

    const code = Confirm.getCode(email)

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      session,
      balance,
      code,
    })
  } catch (e) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  if (!code || !token) {
    return res.status(400).json({
      message: 'Помилка. Обовʼязкові поля відсутні!',
    })
  }

  try {
    const session = Session.getByToken(token)
    if (!session) {
      return res.status(400).json({
        message: 'Помилка. Ви не увійшли в аккаунт',
      })
    }

    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Код не дійсний',
      })
    }

    const user = User.getByEmail(session.user.email)
    user.isConfirm = true
    session.user.isConfirm = true

    return res.status(200).json({
      message: 'Пошта успішно підтверджена',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/signin', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Помилка. Обовʼязкові поля відсутні!',
    })
  }

  try {
    const user = User.getByEmail(email)
    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким e-mail не існує',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Помилка. Неправильний пароль',
      })
    }

    if (!user.isConfirm) {
      Confirm.create(user.email)
    }

    const session = Session.create(user)

    const code = Confirm.getCode(email)

    Notification.newEvent(
      Notification.warning,
      Notification.login,
      email,
    )

    return res.status(200).json({
      message: 'Ви увійшли',
      session,
      code,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/recovery', function (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: 'Помилка. Обовʼязкові поля відсутні!',
    })
  }

  try {
    const user = User.getByEmail(email)
    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким e-mail не існує',
      })
    }

    Confirm.create(email)

    const code = Confirm.getCode(email)

    return res.status(200).json({
      message: 'Код для відновлення паролю відправлено',
      code,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body

  if (!code || !password) {
    return res.status(400).json({
      message: 'Помилка. Обовʼязкові поля відсутні!',
    })
  }

  try {
    const email = Confirm.getData(Number(code))
    if (!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким e-mail не існує',
      })
    }
    user.password = password

    const session = Session.create(user)

    Notification.newEvent(
      Notification.warning,
      Notification.changePassword,
      email,
    )

    return res.status(200).json({
      message: 'Пароль успішно відновлено',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/recovery-email', function (req, res) {
  const { email, password, newEmail } = req.body

  if (!password || !newEmail) {
    return res.status(400).json({
      message: 'Помилка. Обовʼязкові поля відсутні!',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким e-mail не існує',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Помилка. Неправильний пароль',
      })
    }

    user.email = newEmail
    user.isConfirm = true

    const session = Session.create(user)

    Notification.newEvent(
      Notification.warning,
      Notification.changeEmail,
      email,
    )

    return res.status(200).json({
      message: 'Email успішно змінено',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/recovery-password', function (req, res) {
  const { oldPassword, newPassword, email } = req.body

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: 'Помилка. Обовʼязкові поля відсутні!',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким e-mail не існує',
      })
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({
        message: 'Помилка. Неправильний пароль',
      })
    }

    User.updatePassword(user, newPassword)

    Notification.newEvent(
      Notification.warning,
      Notification.changePassword,
      email,
    )

    return res.status(200).json({
      message: 'Пароль успішно відновлено',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// Експортуємо глобальний роутер
module.exports = router
