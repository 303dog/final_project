import React, { Component } from 'react';
import Select from "../components/Select";
import ImagePlay from "../components/Images";


class NasaContainer extends Component {
    state = {
        items: [],
        images: [],
        selectedItem: "",

    };
    
    componentDidMount() {
        const fetchItems = () => {
            fetch("https://api.nasa.gov/planetary/apod?api_key=mJBXhCTnNueGVUrB16XETUXtYNCqQlEFaUeBPhHI")
            .then((res) => res.json())
            .then((data) => {
                const items = Object.keys(data)
                this.setState({ items })
            });
        }
            setTimeout(fetchItems, 2000)
    }

    renderImages = () => {
        return (
            <>
                <h3>{this.state.selectedItem}</h3>
                {this.state.object.map((url, index) => (
                    <ImagePlay
                        key={index}
                        url={url}
                        alt={`image of ${this.state.selectedItem}`}
                    />
                ))}
            </>
        );
    };

    handleItemSelect = (event) => {
        const selectedItem = event.target.value;
        fetch(`https://api.nasa.gov/planetary/${selectedItem}/images`)
            .then((res) => res.json())
            .then((data) => {
                const images = data.object.slice(0, 10);
                this.setState({
                    images,
                    selectedItem,
                });
            });
    };
 
    render() {
        return (
            <div className="container">
                <h1> A great Title</h1>
                <h2>Menu of available items</h2>
                {this.state.items.length > 0 ? (
                    <Select
                        options={this.state.items}
                        handleOnChange={this.handleItemSelect}
                     />
                     ) : (
                         <p>...scanning for life</p>
                    )}
                    {this.state.selectedItem && this.renderImages()}
            </div>
        );
    
    }
}

export default NasaContainer;
