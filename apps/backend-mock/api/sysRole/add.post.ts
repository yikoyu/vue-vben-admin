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
  MOCK_ROLE_LIST.unshift({
    id: faker.string.uuid(),
    name: body.name,
    remark: body.remark,
    status: 0,
    userCnt: 0,
  });

  return useResponseSuccess('');
});
