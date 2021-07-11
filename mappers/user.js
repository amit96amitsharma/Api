exports.toModel = (entity) => {
    if (entity) {
        let model = {
            id: entity._id,
            email: entity.email,
            phone: entity.phone,
        }
        return model
    } else {
        return null
    }

}