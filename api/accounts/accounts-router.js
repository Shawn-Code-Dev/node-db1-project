const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountPayload } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accs = await Accounts.getAll()
    res.json(accs)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
    res.json(req.acc)
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const acc = await Accounts.updateById(req.params.id, req.body)
    res.json(acc)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.acc)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
