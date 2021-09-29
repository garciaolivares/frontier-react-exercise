import React, { Component } from 'react';
import Input from '../Form/Input';
import TextArea from '../Form/TextArea';
import Switch from '../Form/Switch';
import MultiSelect from '../Form/MultiSelect';
import './wizard.scss';

type Props = {
  job: Frontier.Job;
}

type State = {
  step: number,
  pages: number,
  output: any,
  isValid: boolean
}

class Wizard extends Component<Props, State> {

  state: State = {
    step: 1,
    pages: this.props.job.sections.length,
    output: {},
    isValid: false,
  };

  elementDispatcher = (element: Frontier.Element, onChange: Function) => {
    switch (element.type) {
      case 'text':
        return <Input key={element.id} element={element} onChange={onChange} />;
      case 'textarea':
        return <TextArea key={element.id} element={element} onChange={onChange} />;
      case 'boolean':
        return <Switch key={element.id} element={element} onChange={onChange} />;
      case 'multichoice':
        return <MultiSelect key={element.id} element={element} onChange={onChange} />;
    }
    return null;
  };

  handleSubmit = () => {
    console.log(this.state.output);
  };

  handleNextPage = () => {
    this.setState(prevState => ({
      step: prevState.step + 1,
    }), this.validateSection);
  };

  handlePrevPage = () => {
    this.setState(prevState => ({
      step: prevState.step - 1,
    }), this.validateSection);
  };

  handleOnChange = (value: any, id: string) => {
    const output = { ...this.state.output };
    output[id] = value;
    this.setState({ output: output },
      this.validateSection);

  };

  validateSection = () => {
    const {
      props: { job },
      state: { step, output },
    } = this;

    const section: Frontier.Section = job.sections[step - 1];
    for (let element in section.content) {
      const isRequired = section.content[element].metadata.required;
      const id = section.content[element].id;
      if (isRequired && (output[id] === '' || output[id] === undefined)) {
        this.setState({ isValid: false });
        return;
      } else {
        this.setState({ isValid: true });
      }
    }
  };

  render() {
    const {
      props: { job },
      state: { step, pages, isValid },
    } = this;

    return (
      <div className={'wizard-wrapper'}>
        <div className={'wizard-pages'}>
          <div className={'wizard-progress'}>
            <div className={'progress-badge'}>
              Step {step} of {pages}
            </div>
            <div className={'progress-bar'}>
              <div className={'progress'} style={{ width: `${step * 100 / pages}%` }} />
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className={'wizard-carousel'}
                 style={{
                   width: `${800 * pages}px`,
                   left: `${800 * -(step - 1)}px`,
                 }}>
              {job.sections.map((section: Frontier.Section, index: number) => (
                <div key={index} className={'wizard-page'}>
                  <div className={'title'}>{section.title}</div>
                  <div style={{
                    display: index === step - 1 ? 'block' : 'none',
                  }}>
                    {section.content.map((element: Frontier.Element) =>
                      this.elementDispatcher(element, this.handleOnChange),
                    )}
                  </div>
                </div>
              ))
              }
            </div>
          </form>
        </div>

        <div className={'wizard-navigation'}>
          {(step <= pages) && (step !== 1) &&
          <button
            className={'prev'}
            onClick={this.handlePrevPage}
          >
            Back
          </button>
          }
          {step < pages &&
          <button
            className={'next'}
            onClick={() => isValid ? this.handleNextPage() : null}
            disabled={!isValid}
          >
            Next
          </button>
          }
          {isValid && (step === pages) &&
          <button className={'submit'} onClick={this.handleSubmit}>
            Submit
          </button>
          }
        </div>
      </div>
    );
  }
}

export default Wizard;
