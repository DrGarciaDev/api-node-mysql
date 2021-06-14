const { Router } = require('express');
const {
    getCustomers,
    postCustomers,
    putCustomers,
    getCustomer,
    patchCustomers,
    deleteCustomers
} = require('../controllers/customersMysqlController');

const router = Router();

router.get('/get', getCustomers);

router.post('/store', postCustomers);

router.put('/update/:customer_id', putCustomers);

router.get('/show/:customer_id', getCustomer);

router.patch('/', patchCustomers);

router.delete('/destroy/:customer_id', deleteCustomers);

module.exports = router;