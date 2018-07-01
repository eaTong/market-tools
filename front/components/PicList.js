/**
 * Created by eatong on 16-7-29.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PreviewImage from 'm-preview-image';

const PIC_SIZE = 85;

class PicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0
    };
  }

  preview(index, event) {
    event.preventDefault();

    const optionalRender = `<div class="progress">{index}/{total}</div>`;
    const urls = this.props.urlList.map(item => {

      if (typeof item === 'string') {
        return {url: item.replace(',thumb', ',common'), optionalRender}
      } else {
        return {...item, optionalRender, url: item.url.replace(',thumb', ',common')}
      }
    });
    const option = {
      index,
      urls,
      onChangePic: this.onChangePic.bind(this)
    };
    new PreviewImage(option).preview();
  }

  onChangePic(index) {
    this.setState({imgIndex: index});
  }


  getImageItem(url, index) {
    const {urlList, scrollable, maxLine = 3} = this.props;
    const count = this.props.count || 3;
    const length = scrollable ? urlList.length + 1 : maxLine * count;
    if (scrollable) {
      return (
        <li className="scroll-pic-item" key={index}>
          <img src={typeof url === 'string' ? url : url.url}
               alt=""
               onClick={this.preview.bind(this, index)}
          />
        </li>)
    } else {
      return (
        <li className="pic-item" key={index} style={{width: 100 / count - 2 + '%'}}>
          <div className="img-box">
            <img src={typeof url === 'string' ? url : url.url}
                 alt=""
                 onClick={this.preview.bind(this, index)}
            />
          </div>
        </li>
      )
    }
  }

  render() {
    const {urlList, scrollable, maxLine = 3} = this.props;

    if (urlList.length === 0) {
      return (<div/>)
    }

    const {imgIndex} = this.state;
    const count = this.props.count || 3;
    const length = scrollable ? urlList.length + 1 : maxLine * count;

    const showImages = urlList.slice(0, length - 1);




    return (
      <ul className={`pic-list ${scrollable ? 'scrollable' : ''}`}>
        {showImages.map(this.getImageItem.bind(this))}
        {(() => {
          if (length <= urlList.length) {
            if (imgIndex <= length - 1) {
              return (
                <li className="pic-item" style={{width: 100 / count - 2 + '%'}}
                    onClick={this.preview.bind(this, length - 1)}>
                  <div className="img-box">
                    <img src={urlList[length - 1]} alt=""/>
                    <div className="shadow">+{urlList.length - length + 1}</div>
                  </div>
                </li>
              )
            } else {
              return (
                <li className="pic-item" style={{width: 100 / count - 2 + '%'}}
                    onClick={this.preview.bind(this, imgIndex)}>
                  <div className="img-box">
                    <img src={urlList[imgIndex]} alt=""/>
                    <div className="shadow">{`${imgIndex + 1}/${urlList.length}`}</div>
                  </div>
                </li>
              )
            }
          }
        })()}
      </ul>
    );
  }
}

PicList.propTypes = {
  count: PropTypes.number,
  maxLine: PropTypes.number,
  scrollable: PropTypes.bool,
  urlList: PropTypes.array
};
export default PicList;
