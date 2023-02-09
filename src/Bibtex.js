import React from "react";
import { format } from 'react-string-format';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const getLongMonthName = function (date) {
    return monthNames[date.getMonth()];
}
const current = new Date();
const getShortMonthName = function (date) {
    return monthNames[date.getMonth()].substring(0, 3);
}

const accessed = () => format("Online; {0}-{1}-{2}", current.getDate(), getShortMonthName(current), current.getFullYear())
const miscVal = (url) => {
    return `@misc{bworld,
        author = {},
        title = {},
        howpublished = "\\url{${url}}",
        year = {2008}, 
        note = "${accessed()}"}
      `
      
}

class Bibtex extends React.Component {

    state = {
        name: "http://example.com",
        misc: ""
    }

    handleChange = (e) => {
        console.log(this.current)
        this.setState({
            name: e.target.value,
            misc: miscVal(e.target.value)
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Bibtex Generator </h2>
                <input className="form-control" type="text"
                    onChange={this.handleChange}
                    value={this.state.name} />
                <br></br>
                <div className="text-center">
                    <textarea className="form-control" 
                        rows={5}
                        readOnly = {true} 
                        value={this.state.misc}>

                    </textarea>
                    <br></br>
                    <br></br>
                    <CopyToClipboard text={this.state.misc}
                        onCopy={() => this.setState({ copied: true })}>
                        <button>Copy to clipboard with button</button>
                    </CopyToClipboard>
                </div>

            </div>
        )
    }
}

export default Bibtex;