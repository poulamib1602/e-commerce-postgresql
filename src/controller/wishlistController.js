const knex = require("../middleware/database");

const getUserWishlist = async (req, res) => {
    const userId = req.params.userId;
    try {
        const wishlistItems = await knex('wishlist').select('*').where('userId', userId);
        response.success(res, wishlistItems);
    } catch (error) {
        response.error(res, error, 500);
    }
};

const addProductToWishlist = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
        const existingItem = await knex('wishlist')
            .where({ userId: userId, productId: productId })
            .first();
        if (existingItem) {
            return res.status(400).json({ error: 'Product already in the wishlist' });
        }
        const wishlistadded = await knex('wishlist').insert({ userId: userId, productId: productId }).returning('*');
        response.success(res, { message: 'Product added to the wishlist', data: wishlistadded });
    } catch (error) {
        response.error(res, error, 500);
    }
};

const removeProductFromWishlist = async (req, res) => {
    const userId = req.params.userId;
    const wishlistItemId = req.params.wishlistItemId;
    try {
        const deletedRows = await knex('wishlist')
            .where({ id: wishlistItemId, userId: userId })
            .del();
        if (deletedRows > 0) {
            response.success(res, { message: 'Product removed from the wishlist' });
        } else {
            res.status(404).json({ error: 'Wishlist item not found' });
        }
    } catch (error) {
        response.error(res, error, 500);
    }
};

module.exports = {
    removeProductFromWishlist,
    addProductToWishlist,
    getUserWishlist
}