class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll(filter = {}) {
        return this.model.find(filter);
    }

    async getById(id) {
        return this.model.findById(id);
    }

    async create(data) {
        const item = new this.model(data);
        return item.save();
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;