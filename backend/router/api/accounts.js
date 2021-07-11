import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ValidationError } from 'sequelize';

import restoreOrReject from '../../utils/restoreOrReject';
import { RequestError } from '../../RequestError';
import { Item } from '../../db/models';

const router = Router();

router.delete(
  '/:accountType(communals|personals)/:accountId(\\d+)/items/:itemId(\\d+)/',
  restoreOrReject,
  asyncHandler(async (req, res) => {
    const { user, params: { accountId, itemId, accountType } } = req;
    const findFuncName = `find${
      accountType.upperCaseFirst().truncateUntil(/^(Personal|Communal)$/)
    }ByPk`;
    const account = await user[findFuncName](accountId);
    if (!account) {
      throw new RequestError(
        'Account not found',
        'An account with that ID belonging to this user does not exist.',
        404
      );
    }
    const item = await Item.findByPk(itemId);
    if (!item || !(await account.hasItem(item)) || !(await user.hasItem(item))) {
      throw new RequestError(
        'Transaction not found',
        'A transaction item with that ID was not found on this account',
        404
      );
    }
    try {
      await item.destroy();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      console.error(err.toString());
      res.json({ success: false });
    }
  })
);

router.post(
  '/:accountType(personals|communals)/:id(\\d+)/items/',
  restoreOrReject,
  asyncHandler(async (req, res) => {
    const { user, params: { id, accountType }, body } = req;
    const findFuncName = `find${
      accountType.upperCaseFirst().truncateUntil(/^(Personal|Communal)$/)
    }ByPk`;
    const account = await user[findFuncName](id);
    if (!account) {
      throw new RequestError(
        'Account not found',
        'An account with that ID belonging to this user does not exist.',
        404
      );
    }
    try {
      const item = await account.createItem({ ...body, ownerId: user.id });
      res.json({ item });
    } catch (err) {
      console.error(err);
      console.error(err.toString());
      throw new RequestError(
        'Failed to create transaction item',
        'Sorry, something went wrong. Please refresh the page and try again',
        500
      );
    }
  })
);

router.delete('/:accountType(communals|personals)/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id, accountType }, body: { password } } = req;
  if (!user.validatePass(password)) {
    throw new RequestError(
      'Invalid password',
      'The password provided was incorrect',
      401
    );
  }
  const findFuncName = `find${
    accountType.upperCaseFirst().truncateUntil(/^(Personal|Communal)$/)
  }ByPk`;
  const account = await user[findFuncName](id);
  if (!account) {
    throw new RequestError(
      'Account not found',
      'An account with that ID belonging to this user does not exist',
      404
    );
  }
  try {
    if (account.balance === undefined) await user.removeCommunal(account);
    else await account.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    console.error(err.toString());
    res.json({ success: false });
  }
}));

router.post('/:accountType(personals|communals)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body, params: { accountType } } = req;
  const createFuncName = `create${accountType.upperCaseFirst().truncateUntil(/^(Personal|Communal)$/)}`;
  try {
    const account = { ...(await user[createFuncName](body)).dataValues, Items: {} };
    res.json({ account });
  } catch (err) {
    if (err instanceof ValidationError) throw err;
    console.error(err);
    console.error(err.toString());
    throw new RequestError(
      'Account creation failed',
      'Something went wrong. Please refresh the page and try again',
      500
    );
  }
}));

export default router;
