import React, { Fragment } from 'react';
import { Card, Form, Input, Select } from 'antd';
import { withPropsAPI } from 'gg-editor';

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

class DetailForm extends React.Component {

  get item() {
    const { propsAPI } = this.props as any;

    return propsAPI.getSelected()[0];
  }

  handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { form, propsAPI } = this.props as any;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }

        const item = getSelected()[0];

        if (!item) {
          return;
        }

        executeCommand(() => {
          update(item, {
            ...values,
          });
        });
      });
    }, 0);
  };

  renderEdgeShapeSelect = () => {

    return React.createElement(Select, { onChange: this.handleSubmit }, [
      React.createElement(Option, { value: "flow-smooth" }, "Smooth"),
      React.createElement(Option, { value: "flow-polyline" }, "Polyline"),
      React.createElement(Option, { value: "flow-polyline-round" }, "Polyline Round"),
    ]);
    // return (
    //   <Select onChange={this.handleSubmit}>
    //     <Option value="flow-smooth">Smooth</Option>
    //     <Option value="flow-polyline">Polyline</Option>
    //     <Option value="flow-polyline-round">Polyline Round</Option>
    //   </Select>
    // );
  };

  renderNodeDetail = () => {
    const { form } = this.props as any;
    const { label } = this.item.getModel();


    return React.createElement(Item as any, { label: "Label", ...inlineFormItemLayout }, [
      form.getFieldDecorator('label', {
        initialValue: label,
      }),
      React.createElement(Input, { onBlur: this.handleSubmit })
    ])
    // return (
    //   <Item label= "Label" {...inlineFormItemLayout }>
    //     {
    //       form.getFieldDecorator('label', {
    //         initialValue: label,
    //       })(<Input onBlur={ this.handleSubmit } />)
    //     }
    //     < /Item>
    // );
  };

  shapeItem = () => {
    const { form } = this.props as any;
    const { shape = 'flow-smooth' } = this.item.getModel();

    return React.createElement(Item as any, { label: "Shape", ...inlineFormItemLayout }, [
      form.getFieldDecorator('shape', {
        initialValue: shape,
      }),
      this.renderEdgeShapeSelect()
    ])

  }

  renderEdgeDetail = () => {
    // const { form } = this.props as any;
    // const { label = '', shape = 'flow-smooth' } = this.item.getModel();


    return React.createElement(Fragment as any, null, [
      this.renderNodeDetail(),
      this.shapeItem()
    ]);

    // return (
    //   <Fragment>
    //   <Item label= "Label" {...inlineFormItemLayout }>
    //     {
    //       form.getFieldDecorator('label', {
    //         initialValue: label,
    //       })(<Input onBlur={ this.handleSubmit } />)
    //     }
    //     < /Item>
    //     < Item label = "Shape" {...inlineFormItemLayout }>
    //       {
    //         form.getFieldDecorator('shape', {
    //           initialValue: shape,
    //         })(this.renderEdgeShapeSelect())
    //       }
    //       < /Item>
    //       < /Fragment>
    // );
  };

  renderGroupDetail = () => {
    const { form } = this.props as any;
    const { label = '新建分组' } = this.item.getModel();

    return React.createElement(Item as any, { label: "Label", ...inlineFormItemLayout }, [
      form.getFieldDecorator('label', {
        initialValue: label,
      }),
      React.createElement(Input, { onBlur: this.handleSubmit })
    ])

    // return (
    //   <Item label= "Label" {...inlineFormItemLayout }>
    //     {
    //       form.getFieldDecorator('label', {
    //         initialValue: label,
    //       })(<Input onBlur={ this.handleSubmit } />)
    //     }
    //     < /Item>
    // );
  };

  render() {
    const { type } = this.props as any;

    if (!this.item) {
      return null;
    }
    let detailNode;
    if (type === 'node') {
      detailNode = this.renderNodeDetail();
    } else if (type === 'edge') {
      detailNode = this.renderEdgeDetail()
    } else if (type === 'group') {
      detailNode = this.renderGroupDetail()
    }

    return React.createElement(Card, { type: "inner", size: "small", title: type, bordered: false }, [

      React.createElement(Form, { onSubmit: this.handleSubmit }, [
        detailNode
      ])
    ])

    // return (
    //   <Card type="inner" size="small" title={upperFirst(type)} bordered={false}>
    //     <Form onSubmit={this.handleSubmit}>
    //       {type === 'node' && this.renderNodeDetail()}
    //       {type === 'edge' && this.renderEdgeDetail()}
    //       {type === 'group' && this.renderGroupDetail()}
    //     </Form>
    //   </Card>
    // );
  }
}

export default Form.create()(withPropsAPI(DetailForm));