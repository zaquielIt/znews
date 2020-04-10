import React from "react";
import "./Section.css";
import {
  FilterOutlined,
  GlobalOutlined,
  FlagOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Radio, Menu, Spin, Empty, Tag, Alert } from "antd";

const { SubMenu } = Menu;

class Section extends React.Component {
  onChange = (item) => {
    const { title, updateSelectedValue } = this.props;
    updateSelectedValue(title, item.target.value);
  };

  render() {
    const { data, title, loadingSources, defaultValue, disabled } = this.props;
    return data ? (
      loadingSources && title === "Sources" ? (
        <Spin />
      ) : (
        <Menu mode="inline">
          <SubMenu
            title={
              <div>
                {title === "Categories" && <FilterOutlined />}
                {title === "Countries" && <GlobalOutlined />}
                {title === "Languages" && <FlagOutlined />}
                {title === "Sources" && <DeploymentUnitOutlined />}
                <span style={{ marginRight: "5px" }}>{title}</span>
                {disabled ? (
                  <Tag color="gold">only "Top news" tab allows you select a category</Tag>
                ) : (
                  <Tag color="cyan">{defaultValue}</Tag>
                )}
              </div>
            }
          >
            {data.length === 0 ? (
              <Empty description="Sorry, there is not any source to choose with the language+country+category selected"></Empty>
            ) : (
              <Radio.Group defaultValue={defaultValue} size="small">
                {title === "Categories" || title === "Languages" ? null : (
                  <Radio.Button value="All" onChange={this.onChange}>
                    All
                  </Radio.Button>
                )}

                {data.map((elem, pos) => (
                  <Radio.Button
                    key={title + "-" + pos}
                    value={title === "Sources" ? elem.id : elem}
                    onChange={this.onChange}
                    disabled={disabled}
                  >
                    {title === "Sources" ? elem.name : elem}
                  </Radio.Button>
                ))}
              </Radio.Group>
            )}
          </SubMenu>
        </Menu>
      )
    ) : null;
  }
}

export default Section;
