const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async getByEmail(email) {
        return await this.model.findOne({ email });
    }

    async getByEmailWithPassword(email) {
        return await this.model.findOne({ email }).select('+password').select('+isActive');
    }

    async getwithPasswordToken(token) {
        return await this.model.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
    }
}

module.exports = UserRepository;