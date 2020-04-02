require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql =
    'select "productId", "name", "price", "image", "shortDescription" from products';
  db.query(sql).then(result => res.json(result.rows));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  const sql = 'select * from products where "productId" = $1;';
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        next();
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const { cartId } = req.session;
  const isCartId = Object.prototype.hasOwnProperty.call(req.session, 'cartId');
  if (!isCartId) {
    res.json([]);
  } else {
    const sql = `select "c"."cartItemId",
        "c"."price",
        "c"."quantity",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
      where "c"."cartId" = $1`;
    const id = [cartId];
    db.query(sql, id)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  }
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  if (Number(cartItemId) <= 0) {
    return res.status(400).json({
      error: 'cartItemId must be a positive integer'
    });
  }
  const sql = 'delete from "cartItems" where "cartItemId" = $1 returning *;';
  const params = [cartItemId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError('there are no rows in the query result', 400);
      } else {
        res.status(204).json(result.rows);
      }
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId, operator } = req.body;
  if (Number(productId) <= 0) {
    return res.status(400).json({
      error: 'productId must be a positive integer'
    });
  }
  const id = [productId];
  db.query('select "price" from "products" where "productId" = $1', id)
    .then(result1 => {
      if (result1.rows.length === 0) {
        throw new ClientError('there are no rows in the query result', 400);
      } else {
        if (!req.session.cartId) {
          return db
            .query(
              'insert into "carts" ("cartId", "createdAt") values (default, default) returning "cartId"'
            )
            .then(result2 => {
              const obj = {};
              obj.price = result1.rows[0].price;
              obj.cartId = result2.rows[0].cartId;
              return obj;
            });
        } else {
          const obj = {};
          obj.price = result1.rows[0].price;
          obj.cartId = req.session.cartId;
          return obj;
        }
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const qry = 'select * from "cartItems";';
      return db.query(qry).then(result2 => {
        const resultArr = Array.from(result2.rows);
        if (resultArr.length !== 0) {
          const sameProductId = resultArr.filter(
            result => result.productId === productId
          );
          if (sameProductId.length !== 0) {
            const sql = `update "cartItems" set "quantity" =
                            quantity ${operator} $2 where "productId" = $1
                            returning "cartItemId"`;
            const params = [productId, 1];
            return db.query(sql, params);
          } else {
            const sql = `insert into "cartItems" ("cartId", "productId", "price", "quantity")
                          values ($1, $2, $3, $4)
                          returning "cartItemId"`;
            const params = [result.cartId, productId, result.price, 1];
            return db.query(sql, params);
          }
        } else {
          const sql = `insert into "cartItems" ("cartId", "productId", "price", "quantity")
                      values ($1, $2, $3, $4)
                      returning "cartItemId"`;
          const params = [result.cartId, productId, result.price, 1];
          return db.query(sql, params);
        }
      });
    })
    .then(result => {
      const sql = `
        select "c"."cartItemId",
        "c"."price",
        "c"."quantity",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1
      `;
      const cartItemId = [result.rows[0].cartItemId];
      return db.query(sql, cartItemId).then(result => {
        res.status(201).json(result.rows);
      });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    res.status(400).json({
      error: 'there is not cardId'
    });
    return;
  }
  const {
    fullName,
    email,
    phone,
    creditCard,
    expirationDate,
    cvv,
    shippingAddress
  } = req.body;
  if (
    fullName === null ||
    email === null ||
    phone === null ||
    creditCard === null ||
    expirationDate === null ||
    cvv === null ||
    shippingAddress === null
  ) {
    res.status(400).json({
      error: 'Pleas enter correct information'
    });
    return;
  }
  const { cartId } = req.session;
  const sql = `insert into
      "orders" ("cartId", "fullName", "email", "phone", "creditCard", "expirationDate", "cvv", "shippingAddress")
      values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning *;
      `;
  const params = [
    cartId,
    fullName,
    email,
    phone,
    creditCard,
    expirationDate,
    cvv,
    shippingAddress
  ];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
      req.session.destroy(err => {
        if (err) throw err;
        res.json(result.rows[0]);
      });
    })
    .catch(err => next(err));
});

app.get('/api/cartItems', (req, res, next) => {
  const sql = `select *
  from "cartItems"
  join "products" using ("productId")`;
  db.query(sql).then(result => {
    res.json(result.rows);
  });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
