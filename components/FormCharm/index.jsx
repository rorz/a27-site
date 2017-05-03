import React from 'react';
import ParseClient from '../../parse-client.js';

export default class FormCharm extends React.Component {

  submit() {
    const submissionData = {
      data: this.props.data,
    };

    const callback = this.props.callback || null;

    ParseClient(submissionData, () => {
      console.log('callback');
    });
    /*
    Restler.post('https://api.formcharm.com/1/functions/a27Send', {
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': '7Lvyr951Bg',
      },
      data: JSON.stringify(submissionData),
    }).on('complete', (data, response) => {
      if (response.statusCode === 200) {
        if (data.result === 'MESSAGE_SEND_OK') {
                    // Send success
          if (callback) { callback('success'); }
        } else {
                    // Odd error
          console.log(`odd error: ${data.result}`);
          if (callback) { callback('error'); }
        }
      } else {
                // Handle the error
        console.log(response.rawEncoded);
        console.log(`big error: ${response.result}`);
        if (callback) { callback('error'); }
      }
    });
    */
  }

  render() {
    return (
      <div onClick={() => this.submit()} style={this.props.style} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

FormCharm.propTypes = {
    // children
  children: React.PropTypes.element.isRequired,
    // Event Handling:
    // Callback upon request returning — sends a response and an error object (if necessary)
  callback: React.PropTypes.func.isRequired,
    // Styling:
  style: React.PropTypes.object, // Style props passed to the wrapper
  className: React.PropTypes.string, // Classname prop passed to the wrapper
  data: React.PropTypes.object.isRequired, // Contains all the custom form data
};
