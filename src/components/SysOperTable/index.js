import React, { PureComponent } from 'react';
import { Row, Col, Button, Table, Card, Input } from 'antd';

const { Search } = Input;

class SysOperTable extends PureComponent {
  handleTableChange = (pagination, filters, sorter) => {
    if (this.props.onChange) {
      this.props.onChange(pagination, filters, sorter);
    }
  }

  render() {
    const { data: { list, pagination }, loading, columns, searchPlaceHolder, searchFunc, selectedRowKeys, selectChangeFunc } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: selectChangeFunc,
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    return (
      <Card bordered={false}>
        <div>
          <Row gutter={8}>
            <Col span={6}>
              <Search
                placeholder={searchPlaceHolder}
                onSearch={value => searchFunc(value)}
                enterButton
              />
            </Col>
            <Col span={2}>
              <Button icon="plus" type="primary">添加</Button>
            </Col>
            <Col span={2}>
              <Button icon="edit" type="primary">修改</Button>
            </Col>
            <Col span={2}>
              <Button icon="delete" type="danger">删除</Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Table
                loading={loading}
                rowKey={record => record.key}
                rowSelection={rowSelection}
                dataSource={list}
                columns={columns}
                pagination={paginationProps}
                onChange={this.handleTableChange}
              />
            </Col>
          </Row>
        </div>
      </Card>
    );
  }
}


export default SysOperTable;
