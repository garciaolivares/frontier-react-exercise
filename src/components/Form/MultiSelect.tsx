import React, { Component } from 'react';
import Select from 'react-select';
import './form-styles.scss';

type Props = {
  element: Frontier.Element;
  onChange: Function;
}

type State = {
  value: Array<any>
}

class MultiSelect extends Component<Props, State> {

  state: State = {
    value: [],
  };

  handleOnChange = (selectedOptions: any, id: string) => {
    this.setState({ value: selectedOptions },
      ()=> this.validate(selectedOptions, id),
    );
  };

  validate = (selectedOptions: any, id: string) =>{

    if(selectedOptions.length > 0){
      this.props.onChange(selectedOptions.map((o: any) => o.value), id)
    }else{
      this.props.onChange(undefined, id)
    }

  }

  render() {
    const {
      props: { element },
      state: { value },
    } = this;

    const { id, metadata, question_text } = element;

    const customStyles = {
      multiValue: (provided: any) => ({
        ...provided,
        color: '#084298',
        backgroundColor: '#cfe2ff',
        borderColor: '#b6d4fe',
      }),
    };

    return (
      <div className={'form-group'}>
        <label>
          {question_text}
          {metadata.required &&
          <span className={'required'}> *</span>
          }
        </label>
        <Select
          value={value}
          styles={customStyles}
          onChange={(e: any) => this.handleOnChange(e, id)}
          options={metadata.options}
          classNamePrefix={`form-dropdown`}
          className={'form-dropdown'}
          isMulti={true}
          placeholder={metadata.placeholder}
        />
      </div>
    );
  }
}

export default MultiSelect;
