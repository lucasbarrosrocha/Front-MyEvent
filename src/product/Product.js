import React, { Component } from 'react';
import './Product.css';

class Product extends Component {
    
    render() {
        return (
            <div className="poll-content">
                <div className="poll-header">
                    <div className="poll-creator-info">
                        <span className="poll-creator-name">
                            {this.props.product.title}
                        </span>
                    </div>
                    <div className="poll-creator-info">
                        <span className="poll-creator-username">
                            {this.props.product.description}
                        </span>
                    </div>
                    <div className="poll-creator-info">
                        <span className="poll-creator-name">
                             R$: {this.props.product.price}
                        </span>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Product;