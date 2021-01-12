import React, { Component } from 'react';
import Select from "../components/Select";


class TriviaContainer extends Component {
    state = {
        loading: true,
        categories: [],
        pickedCat: "",
        topics: [],

    };
    
    componentDidMount() {
        const fetchTrivia = () => {
            fetch("https://opentdb.com/api.php? amount=10")
            .then((res) => res.json())
            .then((data) => {
                const categories = Object.keys(data.results);
                this.setState({ categories });
            });
        };
        setTimeout(fetchTrivia, 2000);
    }

    handleCatSelect = (event) => {
           const pickedCat = event.target.value;
           fetch((`https://opentdb.com/api.php? amount=10&category=${pickedCat}`)
                .then((res)=> res.json())
                .then((data) => {
                    const topics = data.message.slice(0, 10);
                    this.setState({
                        topics,
                        pickedCat,
                    });
                });

    };
 
    render() {
        return (
            <div className="container">
                <h1>Trivia Challenge</h1>
                <h2>Choose a category</h2>
                {this.state.categories.length > 0 ? (
                    <Select 
                        options={this.state.categories}
                        handleOnChange={this.   handleCatSelect} />
                ) : (
                    <p>..organizing categories</p>
                )}
                {this.state.pickedCat}
            </div>
        );
    
    }
}

export default TriviaContainer
