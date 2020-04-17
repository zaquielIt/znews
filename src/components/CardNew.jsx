//React import
import React from "react";

//antd elements
import { Card, Tooltip, Skeleton } from "antd";

const { Meta } = Card;

class CardNew extends React.Component {
  //render method to print the card with the new basic info
  render() {
    const { key, card, loading } = this.props;
    return card.urlToImage && card.title ? (
      <Skeleton loading={loading}>
        <Card
          key={"Card-" + key}
          hoverable
          style={{ width: 240, height: 450, margin: "0px 15px 15px 0px" }}
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
      </Skeleton>
    ) : null;
  }
}

export default CardNew;
