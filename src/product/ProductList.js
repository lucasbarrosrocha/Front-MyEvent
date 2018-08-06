import React, { Component } from 'react';
import { getAllProduct} from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { withRouter } from 'react-router-dom';
import './ProductList.css';
import Product from './Product';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: false
        };
        this.loadProductList = this.loadProductList.bind(this);
    }

    loadProductList() {
        let promise = getAllProduct();
        
        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise            
        .then(response => {

            this.setState({
                products: response,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    componentWillMount() {
        this.loadProductList();
    }

    render() {
        const productViews = [];
        this.state.products.forEach((product) => {
            productViews.push(<Product 
                key={product.id} 
                product={product}/>)            
        });

        return (
            <div className="polls-container">
                {
                    !this.state.isLoading && this.state.products.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No products Found.</span>
                        </div>    
                    ): null
                }  
                
                {/* {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-polls"> 
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }               */}
                {
                    productViews
                }
                {
                    this.state.isLoading ? 
                    <LoadingIndicator />: null                     
                }
            </div>
        );
    }
}

export default withRouter(ProductList);