import React, { Component } from 'react';
import './form-styles.scss';

type Props = {
  element: Frontier.Element;
  onChange: Function;
}

type State = {
  value: string | number,
  hasError: boolean,
  errorMessage: string
}

class Input extends Component<Props, State> {

  state: State = {
    value: '',
    hasError: false,
    errorMessage: '',
  };

  handleOnChange = (e: any, id: string) => {
    const { metadata } = this.props.element;
    const value = metadata.format === 'number' ? parseInt(e.target.value) : e.target.value;
    this.setState({ value: value },
      () => this.validateInput(value, id));
  };

  handleOnBlur = (e: any, id: string, metadata: Frontier.ElementMeta) => {
    if (metadata.required && (e.target.value === '' || !e.target.value)) {
      this.setState({ hasError: true, errorMessage: 'This field is required' });
    } else {
      this.setState({ hasError: false, errorMessage: '' });
    }
    if (metadata.pattern) {
      if (new RegExp(metadata.pattern).test(e.target.value)) {
        this.setState({ hasError: false, errorMessage: '' });
      } else {
        this.setState({ hasError: true, errorMessage: 'The format is incorrect' });
      }
    }
  };

  validateInput = (value: any, id: string) => {
    const { metadata } = this.props.element;
    if (metadata.pattern) {
      const isValid = new RegExp(metadata.pattern).test(value);
      if (!isValid) {
        this.props.onChange(undefined, id);
        return;
      } else {
        this.props.onChange(value, id);
      }
    } else {
      this.props.onChange(value, id);
    }
  };

  render() {
    const {
      props: { element },
      state: { value, hasError, errorMessage },
    } = this;

    const { id, metadata, question_text } = element;

    return (
      <div className={'form-group'}>
        <label>
          {question_text}
          {metadata.required &&
          <span className={'required'}> *</span>
          }
        </label>
        <input
          type={metadata.format}
          placeholder={metadata.placeholder}
          pattern={metadata.pattern}
          required={metadata.required || false}
          value={value}
          className={hasError ? 'error' : 'valid'}
          onChange={(e: any) => this.handleOnChange(e, id)}
          onBlur={(e: any) => this.handleOnBlur(e, id, metadata)}
          onFocus={() => this.setState({ hasError: false })}
        />
        {errorMessage !== '' &&
        <div className={'text-muted'}>
          {errorMessage}
        </div>
        }
      </div>
    );
  }
}

export default Input;
