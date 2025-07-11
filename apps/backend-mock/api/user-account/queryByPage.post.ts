import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const { pageNo, pageSize } = getQuery(event);

  return usePageResponseSuccess(
    pageNo as string,
    pageSize as string,
    MOCK_USER_ACCOUNT_LIST,
  );
});
