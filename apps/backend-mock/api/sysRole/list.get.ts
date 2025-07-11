import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  return useResponseSuccess(
    MOCK_ROLE_LIST.map((k) => ({
      id: k.id,
      name: k.name,
    })),
  );
});
