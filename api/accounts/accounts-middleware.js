const Accounts = require('./accounts-model')
const yup = require('yup')
const db = require('../../data/db-config')

exports.checkAccountPayload = async (req, res, next) => {
  try {
    const account = await accSchema.validate(req.body)
    req.body = account
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const notUnique = await db('accounts').where('name', req.body.name.trim()).first()

    if (notUnique) {
      next({ status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const acc = await Accounts.getById(req.params.id)
    if (!acc) {
      next({ status: 404, message: 'account not found'})
    } else {
      req.acc = acc
      next()
    }
  } catch (err) {
    next(err)
  }
}

const accSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'name of account must be between 3 and 100')
    .max(100, 'name of account must be between 3 and 100')
    .typeError('name of account must be a string')
    .required('name and budget are required'),
  budget: yup
    .number()
    .typeError('budget of account must be a number')
    .min(0, 'budget of account is too large or too small')
    .max(1000000, 'budget of account is too large or too small')
    .required('name and budget are required')
    .strict(true)
})
