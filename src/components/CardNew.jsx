import React from "react";
import { Card, Tooltip } from "antd";
const { Meta } = Card;

class CardNew extends React.Component {
  render() {
    const { key, card } = this.props;
    return card.urlToImage && card.title ? (
      <Card
        key={"Card-" + key}
        hoverable
        style={{ width: 240, height: 450 }}
        cover={
          card.urlToImage ? (
            <img alt={card.title} src={card.urlToImage} height="175" />
          ) : null
        }
      >
        <Meta
          title={
            <Tooltip title={card.title}>
              <a href={card.url}>{card.title}</a>
            </Tooltip>
          }
          description={
            <div>
              <span style={{ fontWeight: "bolder" }}>{card.source.name}</span>
              <div>{card.description}</div>
            </div>
          }
          style={{ padding: "5px" }}
        />
      </Card>
    ) : null;
  }
}

export default CardNew;
