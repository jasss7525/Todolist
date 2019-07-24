import React from "react";
import "../App.css";

export default class ToDOApp extends React.Component {
    state = {
        text: "",
        id: null,
        list: []
    }
    handleValue = (e) => {
        this.setState({ text: e.target.value })
    }

    onUpdate = (event) => {
        event.preventDefault();
        let { list, id } = this.state
        let objIndex = list.findIndex((obj => obj.id === id));
        if (list[objIndex]) {
            list[objIndex].text = this.state.text
        }
        this.setState({
            list: list,
            id: null,
            text: ''
        })
    }

    add_Item = (e) => {
        e.preventDefault();
        let { list, text } = this.state
        if (!text.length) return;
        let data = {
            id: Date.now(),
            text: text
        }
        list.push(data);
        this.setState ({
            list: list,
            text: ''
        })
    }
    delete_Items = (index) => {
        let { list } = this.state
        const items = list.filter((todo, todoIndex) => {
            return todoIndex !== index

        })
        this.setState({ list : items })
    }
    editText = (data) => {
        this.setState({ id: data.id, text: data.text })
    }
    render() {
        let { list, id } = this.state
        console.log(list, 'list')
        return (
            <div className="outer-container">
                <div className="inner-container">
                    <  input type="text" className="inputField" placeholder="Add items" onChange={this.handleValue} value={this.state.text} /><br/>
                    <div className="btn">
                    {id ? <button className="update-btn"type="button" onClick={this.onUpdate}>Update</button> : <button className="add-btn" type="button" onClick={this.add_Item}>ADD</button>}
                </div>
                </div>
                <div classNAme="item-container">
                    <ul className="list">
                        {list.map((res, index) => {
                            return <div key={index}>
                                <div className="x-btn" onClick={() => this.delete_Items(index)}>X</div>
                                <div className="data" onDoubleClick={() => this.editText(res)}>{res.text}</div>
                            </div>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}