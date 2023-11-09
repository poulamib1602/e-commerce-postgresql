const knex = require("../middleware/database");

async function create(data) {
    try {
        const post = await knex("order").insert(data).returning("*");
        return post;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function update({ id, userId, productId, quantity, amount, address, status }) {
    try {
        const order = await knex("order").where({ id }).select("*");
        if (order.length === 0) {
            return null;
        }
        const updatedorder = await knex("order")
            .where({ id })
            .update({ userId, productId, quantity, amount, address, status })
            .returning("*");
        return updatedorder;
    } catch (error) {
        throw error;
    }
};

async function remove({ id }) {
    try {
        return knex("order").where({ id }).del();
    } catch (error) {
        throw error;
    }
};

async function userorder({ userId }) {
    try {
        return knex("order").select("*").where({ userId });
    } catch (error) {
        throw error;
    }
};

async function all() {
    try {
        return knex("order").select("*");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    create,
    all,
    update,
    remove,
    userorder
};