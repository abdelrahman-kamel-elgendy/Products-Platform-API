const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async getByEmail(email) {
        return this.model.find({ email: email });
    }
}

module.exports = UserRepository;