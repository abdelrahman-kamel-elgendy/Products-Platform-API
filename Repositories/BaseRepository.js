class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return this.model.find();
    }

    async getActive() {
        return this.model.find({ isActive: true });
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