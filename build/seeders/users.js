'use strict';
const { hashSync: $ } = require('bcryptjs'); module.exports = { up: async _ => { await _.bulkInsert('Users', [{ firstName: process.env.ADMIN_FIRSTNAME, email: process.env.ADMIN_EMAIL, password: $(process.env.ADMIN_PASS), courier: true, initialized: true }]); }, down: async _ => { await _.bulkDelete('Users', null, {}); } };
