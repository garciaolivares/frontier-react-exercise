import React, { Component } from 'react';
import './form-styles.scss';

type Props = {
  element: Frontier.Element;
  onChange: Function;
}

type State = {
  value: boolean | null
}

class Switch extends Component<Props, State> {

  handleOnChange = (value: boolean, id: string) => {
    this.setState({ value: value },
      this.props.onChange(value, id));
  };

  state: State = {
    value: null,
  };

  render() {
    const {
      props: { element },
      state: { value },
    } = this;

    const { id, question_text, metadata } = element;
    return (
      <div className={'form-group'}>
        <label>
          {question_text}
          {metadata.required &&
          <span className={'required'}> *</span>
          }
        </label>
        <div className={'list-group'}>
          <div className={value ? 'active' : ''} onClick={() => this.handleOnChange(true, id)}>
            <span>Yes</span>
          </div>
          <div className={value === false ? 'active' : ''} onClick={() => this.handleOnChange(false, id)}>
            <span>No</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Switch;
