import React, {Component} from "react";
import axios from 'axios';
import './CitySearch.css';

class CitySearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            data: []
            //Zip codes in array
        }
    }
    handleChange = (event) => {
        this.setState({
            city: event.target.value
        });
    }
    componentDidMount = () => {
        axios.get(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
        //makes it so input automatically becomes uppercase. Easy for the system to read 
            .then(response => {
                const newInfo = response.data;
                this.setState({data: newInfo});
            })
            .catch(err => console.log(err));
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.city !== this.state.city) {
            this.componentDidMount();
        }
    }
    render() {
        return (
            <div>
                <label>
                    City Name:
                    <input 
                    className="zipcode_input"
                    type="text" 
                    name="zipcode" 
                    placeholder="Try Springfield" 
                    onChange={this.handleChange.bind(this)}>

                    </input>
                </label>
                {this.state.data.map(data =>
                    <div key={data.RecordNumber} className="city">
                        <ul>
                            <li>Zip Code: {data}</li>
                            {/* gets zip code */}
                        </ul>
                    </div>

                     )}
                   {/* : {this.state.city ? <p className="p_info">No Results</p>: "NoResults"} */}
              {/* shows no results underneath not working */}
            </div>
             
        )
    }
}
export default CitySearch