import React from 'react';

import globalStyles from '../../general-styles/global.css';

class InputValidationField extends React.Component {
    constructor(props) {
        super(props);
        this.hasError = this.hasError.bind(this);
    }

    hasError() {
        return this.props.showError && this.props.errorText !== "";
    }

    render() {
        return (
            <div>
                {this.hasError() &&
                    <div className="validation-error">
                        <span className="text">{this.props.errorText}</span>
                    </div>
                }
                <label>
                    <span>{this.props.label}</span>
                    <input
                        name={this.props.name}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        className={globalStyles.input}
                    />
                </label>
            </div>
        );
    }
}

export default InputValidationField;