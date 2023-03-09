import axios from 'axios';
import { AUTH_SERVER_BASE_URL } from '../../config.js';
import { HttpError } from '../../errors.js';

async function validTokenData(token) {
  try {
    const res = await axios.post(`${AUTH_SERVER_BASE_URL}/api/token/validate`, {
      token,
    });
    return res.data;
  } catch (err) {
    throw new HttpError('Internal Server Error', 500);
  }
}

export async function handleAuth(req, res, next) {
  const authorizationToken = req.get('Authorization');
  if (!authorizationToken) {
    return res.status(401).send('Unauthorized');
  }

  let validatedTokenData;
  try {
    validatedTokenData = await validTokenData(authorizationToken);
  } catch (err) {
    next(err);
    return;
  }

  if (!validatedTokenData.isValidToken) {
    return res.status(401).send('Unauthorized');
  }

  req.user = {
    id: validTokenData.id,
    email: validTokenData.email,
  };

  next();
}
