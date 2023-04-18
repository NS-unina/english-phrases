import React from "react";


// https://codepen.io/ghozt12/pen/LVaxLM
import jsonPhrases from './phrases.json';
import Fuse from "fuse.js";
import {styles} from './Styles';

const uniqueArr = (jsonPhrases) => {
    var temp = []
    let data = jsonPhrases;
    data = data.filter((item) => {
        if (!temp.includes(item.Phrase)) {
            temp.push(item.Phrase)
            return true;
        }
    })
    return data

}
// Initialization of the elements
let phrases = uniqueArr(jsonPhrases)
let _sections = phrases.map(f => f.Section);
let _what = [... new Set(phrases.map(f => f.What))];
_sections = [...new Set(_sections)];
let what = _what.map(f => {
    return {
        what: f,
        checked: false
    }
})
let sections = _sections.map(f => {
    return {
        section: f,
        checked: false
    }
}
);
let filteredData = phrases;

const handleWhatChange = (label, parentHandler) => {
        what.forEach(s => {
            if (s.what == label) {
                    s.checked = !s.checked;
            }
        });
        let trueWhat = what.filter(w => w.checked).map(w => w.what)
        parentHandler(trueWhat);

    };
const handleSectionChange = (label, parentHandler) => {
    console.log("HANDLE CHANGE")
        sections.forEach(s => {
            if (s.section == label) {
                    s.checked = !s.checked;
            }
        });
        let trueSections = sections.filter(s => s.checked).map(s => s.section)
        parentHandler(trueSections);
    };
class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
        // this.handleChange = handleChange.bind(this);
    }
    handleChange() {
        this.setState(prevState => ({
            checked: !prevState.checked
        }));
        this.props.myHandle(this.props.label, this.props.parentHandler)
        // sections.forEach(s => {
        //     if (s.section == this.props.label) {
        //             s.checked = !s.checked;
        //     }
        // });
    }


    render() {
        return (
            <div class="basis-1/3">
                <label>
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange.bind(this)} />
                    <span class="ml-4"> {this.props.label} </span>
                </label>
            </div>
        );
    }
}



class TableData extends React.Component {


    render() {
        return (
            <p class="text-center space-y-2 place-content-center"> {this.props.data} </p>
        );
    }
}

// class Selection extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {checked = false, setChecked}
//     }


//     handleChange = () => {
//       setChecked(!this.checked);
//     };


//     render() {
//         return (
//             <div>
//                 <label>
//                     <input type="checkbox" />
//                     <span class="ml-4">{this.props.data}</span>
//                 </label>
//             </div>
//         );
//     }

// }
// Table Element
// class TableTitle extends React.Component {
//     render() {
//         return (
//             <div class="w-full place-content-center">
//                 <h2> {this.props.title}</h2>
//             </div>
//         );
//     }
// }

class SearchMatch extends React.Component {

    render() {
        return (
            <div class="w-full">
                <p> Match: {this.props.match}</p>
            </div>
        );
    }
}

const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
        "Section",
        "What",
        "Phrase"
    ]
};


class SidebarWhat extends React.Component {

    render() {
        let me = this;
        let rows = []
        let i = 0

        this.props.data.forEach(function (row) {
            rows.push(<Checkbox key={row.what} label={row.what} value={row.what} parentHandler={me.props.handler} myHandle={handleWhatChange}/>);
        });
        return (
            <div>
                <h2 class="text-center"> What </h2>
                {rows}
            </div>
        )
    }
}
class Sidebar extends React.Component {

    render() {
        let rows = []
        var me = this;
        console.log(this.props)

        this.props.data.forEach(function (row) {
            rows.push(<Checkbox key={row.section} label={row.section} value={row.section} parentHandler={me.props.handler} myHandle={handleSectionChange}/>);
        });
        return (
            <div>
                <h2 class="text-center"> Sections </h2>
                {rows}
            </div>
        )
    }
}
// Table
class Table extends React.Component {

    render() {

        console.log("IS CHANGED")
        // We need to get each row and store it in an array
        var rowsTitle = [];
        var search = [];
        // var searchterm = this.props.searchTerm; // need this or it doesnt work
        // if (searchterm != "") {
        //     const fuse = new Fuse(this.props.phrases, options);
        //     let filtered = fuse.search(searchterm)
        //     this.props.phrases = filtered.map(d => d.item);
        // }

        

        var key = '';
        this.props.phrases.forEach(function (row) {
            rowsTitle.push(<TableData key={row.Phrase} data={row.Phrase} />);

        });

        // Then render all. Render using childs. Send them prop.title and prop.data
        return (
            <div class="basis-2/3">
                {rowsTitle}
            </div>
        );
    }
}

// Search
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.filterList = this.filterList.bind(this)
    }


    filterList(event) {
        this.props.userInput(event.target.value);
    }

    render() {
        console.log(this.props.searchTerm)
        return (
            <div style={styles.Sticky}>
                <input  class="w-full border-1 rounded-md border-black" key={this.props.searchTerm} type="text"
                    placeholder="Start Typing"
                    value={this.props.searchTerm}
                    onChange={this.filterList} autoFocus>
                </input>
            </div>

        );
    }
}

// App

// JSON
var DATA = [{
    "title": "Binding",
    "tags": "Binding Hiding Miding Sliding SAVE",
    "content": "This is the binding content area where information about binding is shown"
}, {
    "title": "Constant",
    "tags": "Math bath slather calf save",
    "content": "This is the Constant content area where information about Constant is shown"
}, {
    "title": "Numbers",
    "tags": "Happy birthday sir and maam",
    "content": "This is the Numbers content area where information about Numbers is shown"
}];





class Json extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            filterText2: '', 
            phrases : phrases
        }

    }
    onChangeSection = (trueSections) => {
        console.log("ON CHANGE SECTION")
        if (trueSections.length > 0) {
            this.setState({
                phrases : this.state.phrases.filter(d => trueSections.includes(d.Section))
            })
            
        } else {
            this.setState({
                state : this.state.phrases = phrases
            });
        }

    }
    onChangeWhat = (trueWhat) => {
        if (trueWhat.length > 0) {
            this.setState({
                phrases : this.state.phrases.filter(d => trueWhat.includes(d.What))
            })
            
        } else {
            this.setState({
                state : this.state.phrases = phrases
            });
        }
    }

    handleUserInput = (filter) => {
        this.setState({
            filterText: filter
        })
        var searchterm = filter; // need this or it doesnt work
        if (searchterm != "") {
            const fuse = new Fuse(this.state.phrases, options);
            let filtered = fuse.search(searchterm)
            this.state.phrases = filtered.map(d => d.item);
        }  else {
            this.state.phrases = phrases;
        }



    }

    render() {

        return (

            <div>
                <h1 class="text-center">English for Writing Research Papers</h1>
                <p class="text-center">Wallwork, A. (2016). English for Writing Research Papers. Springer International Publishing. <br></br><a href="https://doi.org/10.1007/978-3-319-26094-5"> DOI </a> </p>
                <Search searchTerm={this.state.filterText} userInput={this.handleUserInput.bind(this)} />
                <div class="flex flex-row">
                    <Table searchTerm={this.state.filterText} phrases={this.state.phrases}/> 
                    <div class="basis-1/3">
                    <Sidebar data={sections} handler={this.onChangeSection}></Sidebar>
                    <SidebarWhat data={what} handler={this.onChangeWhat}></SidebarWhat>

                    </div>
                </div>
            </div>
        );
    }

}
export default Json;