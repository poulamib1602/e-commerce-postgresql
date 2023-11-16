const knex = require("./database");

knex.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.string("email").unique().notNullable();
        table.string("isAdmin").defaultTo(false);
        table.string('reset_token', 255).defaultTo(null);
        table.timestamp('reset_token_expires_at').defaultTo(null);
        table.timestamps(true, true);
      });
    }
  })
  .then(() => {
    console.log("Created users table");
  })
  .catch((error) => {
    console.error(error);
  });

knex.schema
  .hasTable("product")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("product", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.string("brand").notNullable();
        table.string("category");
        table.string("image");
        table.integer("price").notNullable();
        table.json('cart');
        table.timestamps(true, true);
      });
    }
  })
  .then(() => {
    console.log("Created product table");
  })
  .catch((error) => {
    console.error(error);
  });

knex.schema
  .hasTable("order")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("order", (table) => {
        table.increments("id").primary();
        table.integer("userId").unsigned().references("users.id");
        table.integer("productId").unsigned().references("product.id");
        table.integer("quantity").notNullable();
        table.string("address").notNullable();
        table.integer("amount").notNullable();
        table.string('status').defaultTo("pending");
        table.timestamps(true, true);
      });
    }
  })
  .then(() => {
    console.log("Created order table");
  })
  .catch((error) => {
    console.error(error);
  });

knex.schema
  .hasTable("cart")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("cart", (table) => {
        table.increments("id").primary();
        table.integer("userId").unsigned().references("users.id");
        table.integer("productId").unsigned().references("product.id");
        table.integer("quantity").defaultTo(1);
        table.timestamps(true, true);
      });
    }
  })
  .then(() => {
    console.log("Created cart table");
  })
  .catch((error) => {
    console.error(error);
  });

knex.schema
  .hasTable("wishlist")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("wishlist", (table) => {
        table.increments("id").primary();
        table.integer("userId").unsigned().references("users.id");
        table.integer("productId").unsigned().references("product.id");
        table.timestamps(true, true);
      });
    }
  })
  .then(() => {
    console.log("Created wishlist table");
  })
  .catch((error) => {
    console.error(error);
  });

knex.schema
  .hasTable("product_reviews")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("product_reviews", (table) => {
        table.increments("id").primary();
        table.integer("userId").unsigned().references("users.id");
        table.integer("productId").unsigned().references("product.id");
        table.integer("rating ").notNullable().checkIn([1, 2, 3, 4, 5]);
        table.text('review_text');
        table.timestamps(true, true);
      });
    }
  })
  .then(() => {
    console.log("Created product_reviews table");
  })
  .catch((error) => {
    console.error(error);
  });