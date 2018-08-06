import React, { Component } from 'react';
import { createProduct } from '../util/APIUtils';
import './NewPoll.css';  
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            price: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    }

    validateQuestion(value){
        return value;
    }

    handleSubmit(event) {
        event.preventDefault();
        const productData = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price
        };

        createProduct(productData)
        .then(response => {
            this.props.history.push("/");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');    
            } else {
                notification.error({
                    message: 'My Event',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({
            title: value,
            ...this.validateQuestion(value)
        });
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({
            price: value,
            ...this.validateQuestion(value)
        });
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: value,
            ...this.validateQuestion(value)
        });
    }

    render() {
        return (
            <div className="new-poll-container">
                <h1 className="page-title">Novo Serviço ou Produto</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem className="poll-form-row">
                        <TextArea 
                            placeholder="Titulo do serviço ou produto"
                            style = {{ fontSize: '20px' }} 
                            autosize={{ minRows: 1, maxRows: 6 }} 
                            name = "title"
                            value = {this.state.title}
                            onChange = {this.handleTitleChange} />
                        </FormItem>
                        
                        <FormItem className="poll-form-row">
                        <Input 
                            placeholder="Preço"
                            style = {{ fontSize: '16px' }} 
                            autosize={{ minRows: 1, maxRows: 6 }} 
                            name = "price"
                            value = {this.state.price}
                            onChange = {this.handlePriceChange} />
                        </FormItem>

                        <FormItem className="poll-form-row">
                        <TextArea 
                            placeholder="Descrição"
                            style = {{ fontSize: '16px' }} 
                            autosize={{ minRows: 3, maxRows: 6 }} 
                            name = "description"
                            value = {this.state.description}
                            onChange = {this.handleDescriptionChange} />
                        </FormItem>
                        
                        <FormItem className="poll-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="create-poll-form-button">Criar Novo</Button>
                        </FormItem>

                        
                    </Form>
                </div>    
            </div>
        );
    }
}

export default NewProduct;