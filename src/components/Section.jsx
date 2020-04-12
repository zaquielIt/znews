import React from "react";
import "./Section.css";
import {
  FilterOutlined,
  GlobalOutlined,
  FlagOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Radio, Menu, Spin, Empty, Tag, Alert, Tooltip } from "antd";

const { SubMenu } = Menu;

class Section extends React.Component {
  onChange = (item) => {
    const { title, updateSelectedValue } = this.props;
    updateSelectedValue(title, item.target.value);
  };

  render() {
    const {
      data,
      title,
      loadingSources,
      defaultValue,
      disabled,
      color,
      disabledES,
    } = this.props;
    return (
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
                <Tag color={color}>
                  only "Top news" tab allows you select a category
                </Tag>
              ) : (
                <Tag color={color}>{defaultValue}</Tag>
              )}
            </div>
          }
        >
          {data && data.length === 0 ? (
            <Empty description="Sorry, there is not any source to choose with the language+country+category selected"></Empty>
          ) : loadingSources && title === "Sources" ? (
            <Spin />
          ) : (
            <Radio.Group defaultValue={defaultValue} size="small">
              {title === "Categories" || title === "Languages" ? null : (
                <Radio.Button value="All" onChange={this.onChange} disabled={disabled}>
                  All
                </Radio.Button>
              )}

              {data.map((elem, pos) => (
                <Tooltip title={(disabledES && elem === "es") && "disabled for news tab"}>
                  <Radio.Button
                    key={title + "-" + pos}
                    value={title === "Sources" ? elem.id : elem}
                    onChange={this.onChange}
                    disabled={disabled || (disabledES && elem === "es")}
                  >
                    {title === "Sources" ? elem.name : elem}
                  </Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
          )}
        </SubMenu>
      </Menu>
    );
  }
}

export default Section;
