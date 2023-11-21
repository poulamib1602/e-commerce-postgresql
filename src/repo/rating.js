const knex = require("../middleware/database");
const createProductReview = async (productId, userId, rating, reviewText) => {
    try {
        const result = await knex('product_reviews')
            .insert({
                productId: productId,
                userId: userId,
                rating,
                review_text: reviewText,
            })
            .returning('*');
        return result[0];
    } catch (error) {
        console.error('Error creating product review:', error);
        throw error;
    }
};

const getProductReviews = async (productId) => {
    try {
        const reviews = await knex('product_reviews')
            .select('*')
            .where('productId', productId);
        return reviews;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const calculateAverageRating = async (productId) => {
    try {
        const result = await knex('product_reviews')
            .where({ productId: productId })
            .select(knex.raw('ROUND(AVG(rating), 2) as average_rating'))
            .first();
        return result.average_rating || 0;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProductReview,
    getProductReviews,
    calculateAverageRating,
};
