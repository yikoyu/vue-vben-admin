import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const body = await readBody(event);

  const index = MOCK_ROLE_LIST.findIndex((k) => k.id === body.id);
  MOCK_ROLE_LIST[index] = {
    ...MOCK_ROLE_LIST[index],
    ...body,
  };

  return useResponseSuccess('');
});
