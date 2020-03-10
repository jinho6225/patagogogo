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
  const sql = 'select "productId", "name", "price", "image", "shortDescription" from products';
  db.query(sql)
    .then(result => res.json(result.rows));
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
  const sql = 'select * from carts';
  db.query(sql)
    .then(result => res.json(result.rows));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  if (Number(productId) <= 0) {
    return res.status(400).json({
      error: 'productId must be a positive integer'
    });
  }
  const id = [productId];
  db.query('select "price" from "products" where "productId" = $1', id)
    .then(result1 => {
      if (result1.rows.length === 0) {
        throw new ClientError('bad request', 400);
      } else {
        return db.query('insert into "carts" ("cartId", "createdAt") values (default, default) returning "cartId"')
          .then(result2 => {
            const obj = {};
            obj.price = Number((result1.rows[0].price / 100).toFixed(2));
            obj.cartId = result2.rows[0].cartId;
            return (obj);
          });
      }
    })
    .then(result => {
      req.session = {
        cartId: result.cartId
      };
      const sql = 'insert into "cartItems" ("cartId", "productId", "price") values ($1, $2, $3) returning "cartItemId"';
      const params = [result.cartId, req.body.productId, result.price];
      return db.query(sql, params);
    })
    .then(result => {
      const sql = `
        select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1
      `;
      const cartItemId = [result.rows[0].cartItemId];
      return db.query(sql, cartItemId)
        .then(result => result.json());
    })
    .catch(err => console.error(err));
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
