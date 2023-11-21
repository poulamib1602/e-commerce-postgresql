const knex = require("../middleware/database");

async function create(data) {
    try {
        const post = await knex("product").insert(data).returning("*");
        return post;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function update({ id, name, description, price, category, image, cart }) {
    try {
        const product = await knex("product").where({ id }).select("*");
        if (product.length === 0) {
            return null;
        }
        const updatedproduct = await knex("product")
            .where({ id })
            .update({ name, description, price, category, image, cart })
            .returning("*");
        return updatedproduct;
    } catch (error) {
        throw error;
    }
};

async function remove({ id }) {
    try {
        return knex("product").where({ id }).del();
    } catch (error) {
        throw error;
    }
};

async function allprod() {
    try {
        return knex("product").select("*");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    create,
    allprod,
    update,
    remove,
};