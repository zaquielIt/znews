import React from 'react';
import { connect } from "react-redux"
import { Tag, Input } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";

import { setTagsArticles } from "store/actions/news";

class Tags extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            inputVisible: false,
            inputValue: "",
          };
    }
  

  handleClose = (removedTag) => {
    const { tagsArticles, setNewTags } = this.props;
    const tags = tagsArticles.filter((tag) => tag !== removedTag);
    setNewTags(tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { tagsArticles,setNewTags } = this.props;
    const { inputValue  } = this.state;
    let tags = tagsArticles;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    setNewTags(tags);
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };

  saveInputRef = (input) => (this.input = input);

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { tagsArticles } = this.props;
    const { inputVisible, inputValue } = this.state;
    const tagChild = tagsArticles.map(this.forMap);
    return (
      <div style={{display: '-webkit-box'}}>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: "from",
              duration: 100,
              onComplete: (e) => {
                e.target.style = "";
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    tagsArticles: state.newsReducer.tagsArticles
  });

const mapDispatchToProps = (dispatch) => ({
    setNewTags: (newTagsArticle) => dispatch(setTagsArticles(newTagsArticle)),
  });

export default connect(mapStateToProps,mapDispatchToProps)(Tags);
