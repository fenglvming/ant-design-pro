import React, { PureComponent } from 'react';
import { Row, Col, Input, Button, Icon, Table, Card } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SysOperTable from '../../components/SysOperTable';
import styles from './user.less';

const { Search } = Input;
// const dataSource = [{
//   key: '1',
//   name: '胡彦斌',
//   age: 32,
//   address: '西湖区湖底公园1号'
// }, {
//   key: '2',
//   name: '胡彦祖',
//   age: 42,
//   address: '西湖区湖底公园1号'
// }];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '操作',
  key: 'operation',
  fixed: 'right',
  width: 100,
  render: () => <div><Button icon="edit" type="primary"></Button><Button icon="delete" type="danger"></Button></div>,
}];

@connect(({ sysuser, loading }) => ({
  sysuser,
  searching: loading.effects['sysuser/list'],
}))
export default class SysUserPage extends PureComponent {
  state = {
    selectedRowKeys: [],
    searchKey: '',
    currentPage: 1,
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
  }
  search = (value) => {
    this.state.searchKey = value;
    this.state.currentPage = 1;
    this.props.dispatch({
      type: 'sysuser/list',
      payload: {
        searchKey: this.state.searchKey,
        currentPage: this.state.currentPage,
      },
    });
  }

  page = (currentPage) => {
    this.state.currentPage = currentPage;
    this.props.dispatch({
      type: 'sysuser/list',
      payload: {
        searchKey: this.state.searchKey,
        currentPage: this.state.currentPage,
      },
    });
  }

  render() {
    const searchPlaceholderLabel = "请输入账户名";
    const data = {
      list: this.props.sysuser.list,
      pagination: {
        defaultCurrent: 6,
        total: 500,
        pageSize: 20,
        onChange: (page) => this.page(page),
      },
    };
    return (
      <PageHeaderLayout>
        <SysOperTable
          loading={this.props.searching}
          columns={columns}
          searchFunc={this.search}
          data={data}
          searchPlaceholder={searchPlaceholderLabel}
          selectChangeFunc={this.onSelectChange}
          selectedRowKeys={this.state.selectedRowKeys}
        />
      </PageHeaderLayout>
    );
  }
}
