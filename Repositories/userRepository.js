const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async getByEmail(email) {
        return await this.model.find({ email: email });
    }
}

module.exports = UserRepository;