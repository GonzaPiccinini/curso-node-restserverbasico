const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es olbigatorio']
    }
});

module.exports = model('Role', RoleSchema);