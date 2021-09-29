import React, {Component} from 'react';
import "./form-styles.scss";

type Props = {
  element: Frontier.Element,
  onChange: Function
}

type State = {
  value: string
}

class TextArea extends Component<Props, State> {

  state:State = {
    value: ""
  }

  handleOnChange = (e: any, id: string) => {
    this.setState({value: e.target.value},
      this.props.onChange(e.target.value, id));
  }

    render() {
        const {
          props: {element},
          state: {value}
        } = this;

        const {id, metadata, question_text} = element;

        return (
          <div className={"form-group"}>
                <label>
                  {question_text}
                    {metadata.required &&
                      <span className={"required"}> *</span>
                    }
                </label>
                <textarea
                    placeholder= {metadata.placeholder}
                    required= {metadata.required || false}
                    rows={3}
                    value={value}
                    onChange={(e: any) => this.handleOnChange(e, id)}
                />
            </div>

        );
    }
}

export default TextArea;
