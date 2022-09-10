import express from 'express';
import { serve, setup } from 'swagger-ui-express';

const app = express();
const port = 7878;

app.use(express.static('swagger/openapi'));

app.use(
  '/swagger',
  serve,
  setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  }),
);

app.listen(port, () => {
  console.log(`Swagger listening on port ${port}`);
});
