import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// 搜索人员或账号列表
export async function sysUserList(searchKey) {
  return request('/api/admin/accounts', {
    method: 'POST',
    body: {
      searchKey,
      method: 'POST',
    },
  });
}
