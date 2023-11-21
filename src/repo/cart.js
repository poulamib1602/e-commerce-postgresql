const knex = require("../middleware/database");

async function create(data) {
    try {
        const post = await knex("cart").insert(data).returning("*");
        return post;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function update({ id, quantity, productId }) {
    try {
        const cart = await knex("cart").where({ id }).select("*");
        if (cart.length === 0) {
            return null;
        }
        const updatedcart = await knex("cart")
            .where({ id })
            .update({ quantity, productId })
            .returning("*");
        return updatedcart;
    } catch (error) {
        throw error;
    }
};

async function remove({ id }) {
    try {
        return knex("cart").where({ id }).del();
    } catch (error) {
        throw error;
    }
};

async function usercart({ userId }) {
    try {
        return knex("cart").select("*").where({ userId });
    } catch (error) {
        throw error;
    }
};

async function all() {
    try {
        return knex("cart").select("*");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    create,
    all,
    update,
    remove,
    usercart
};