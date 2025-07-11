import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const body = await readBody(event);

  const index = MOCK_USER_ACCOUNT_LIST.findIndex(
    (k) => k.userId === body.userId,
  );
  MOCK_USER_ACCOUNT_LIST[index] = {
    ...MOCK_USER_ACCOUNT_LIST[index],
    bindPhone: body.bindPhone,
    nickName: body.nickName,
    roles: MOCK_ROLE_LIST.filter((item) => body.roles?.includes(item.id)),
  };

  return useResponseSuccess('');
});
