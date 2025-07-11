import { fakerZH_CN as faker } from '@faker-js/faker';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const body = await readBody(event);
  MOCK_USER_ACCOUNT_LIST.unshift({
    userId: faker.string.uuid(),
    accountState: 0,
    bindPhone: body.bindPhone,
    nickName: body.nickName,
    roles: MOCK_ROLE_LIST.filter((item) => body.roleIds?.includes(item.id)),
  });

  return useResponseSuccess('');
});
