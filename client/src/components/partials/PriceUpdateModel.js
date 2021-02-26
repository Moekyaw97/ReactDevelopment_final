import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePrice } from "../../actions/priceActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class PriceUpdateModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            parent_id: this.props.record.parent_id,
            amount: this.props.record.amount,
            uom: this.props.record.uom,
            location: this.props.record.location,
            description: this.props.record.description,
            status: this.props.record.status,
            featured: this.props.record.featured,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                parent_id: nextProps.record.parent_id,
                amount: nextProps.record.amount,
                uom: nextProps.record.uom,
                location: nextProps.record.location,
                description: nextProps.record.description,
                status: nextProps.record.status,
                featured: nextProps.record.featured,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        
        }
        else  {
            $('#update-price-modal').modal('hide');
           
        }
}


    onChange = e => {
        if (e.target.id === 'price-update-amount') {
            this.setState({ amount: e.target.value });
        }
        if (e.target.id === 'price-update-uom') {
            this.setState({ uom: e.target.value });
        }
        if (e.target.id === 'price-update-location') {
            this.setState({ location: e.target.value });
        }
        if (e.target.id === 'price-update-description') {
            this.setState({ description: e.target.value });
        }
        if (e.target.id === 'price-update-status') {
            this.setState({ status: e.target.value });
        }
        if (e.target.id === 'price-update-featured') {
            this.setState({ featured: e.target.value });
        }
    };

    onPriceUpdate = e => {
        e.preventDefault();
        const newPrice = {
            _id: this.state.id,
            amount: this.state.amount,
            uom: this.state.uom,
            location: this.state.location,
            description: this.state.description,
            status: this.state.status,
            featured: this.state.featured
        };
        this.props.updatePrice(newPrice);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-price-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Price</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onPriceUpdate} id="update-price">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="price-update-id"
                                        type="text"
                                        className="d-none"/>

                                     <div className="row mt-2">
                                     <div className="col-md-3">
                                     <label htmlFor="amount">Amount</label>
                                     </div>
                                     <div className="col-md-9">
                                     <input
                                     onChange={this.onChange}
                                     value={this.state.amount}
                                     id="price-update-amount"
                                     type="text"
                                     error={errors.amount}
                                     className={classnames("form-control", {
                                        invalid: errors.amount
                                    })}/>
                                     <span className="text-danger">{errors.amount}</span>
                                     </div>
                                     </div>

                                     <div className="row mt-2">
                                     <div className="col-md-3">
                                     <label htmlFor="uom">UOM</label>
                                     </div>
                                     <div className="col-md-9">
                                     <input
                                     onChange={this.onChange}
                                     value={this.state.uom}
                                     error={errors.uom}
                                     id="price-update-uom"
                                     type="text"
                                     className={classnames("form-control", {
                                        invalid: errors.uom
                                    })}
                                    />
                                    <span className="text-danger">{errors.uom}</span>
                                    </div>
                                    </div>

                                    <div className="row mt-2">
                                    <div className="col-md-3">
                                    <label htmlFor="location">Location</label>
                                    </div>
                                    <div className="col-md-9">
                                    <select 
                                    onChange={this.onChange} className="btn dropdown-toggle" id="price-update-location" type="text"
                                    error={errors.location}
                                    className={classnames("form-control", {
                                        invalid: errors.location
                                    })}>
                                    <option value="Yangon" selected={this.state.location === "Yangon"}>Yangon</option>
                                    <option value="Mandalay" selected={this.state.location === "Mandalay"}>Mandalay</option>
                                    </select>
                                    </div>
                                    </div>

                                    <div className="row mt-2">
                                    <div className="col-md-3">
                                    <label htmlFor="description">Description</label>
                                    </div>
                                    <div className="col-md-9">
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    error={errors.description}
                                    id="price-update-description"
                                    type="text"
                                    className={classnames("form-control", {
                                        invalid: errors.description
                                    })}
                                    />
                                    <span className="text-danger">{errors.description}</span>
                                    </div>
                                    </div>

                                    <div className="row mt-2">
                                    <div className="col-md-3">
                                    <label htmlFor="status">Status</label>
                                    </div>
                                    <div className="col-md-9">
                                    <label>
                                    <input
                                    type="radio"
                                    value="yes"
                                    id="price-update-status"
                                    checked={this.state.status === "yes"}
                                    onChange={this.onChange}
                                    />
                                    Yes
                                    </label>
                                    &nbsp;
                                    <label>
                                    <input
                                    type="radio"
                                    value="no"
                                    id="price-update-status"
                                    checked={this.state.status === "no"}
                                    onChange={this.onChange}
                                    />
                                    No
                                    </label>

                                    <span className="text-danger">{errors.status}</span>
                                    </div>
                                    </div>

                                    <div className="row mt-2">
                                    <div className="col-md-3">
                                    <label htmlFor="featured">Featured</label>
                                    </div>
                                    <div className="col-md-9">
                                    <label>
                                    <input
                                    type="radio"
                                    value="yes"
                                    id="price-update-featured"
                                    checked={this.state.featured === "yes"}
                                    onChange={this.onChange}
                                    />
                                    Yes
                                    </label>
                                    &nbsp;
                                    <label>
                                    <input
                                    type="radio"
                                    value="no"
                                    id="price-update-featured"
                                    checked={this.state.featured === "no"}
                                    onChange={this.onChange}
                                    />
                                    No
                                    </label>

                                    <span className="text-danger">{errors.featured}</span>
                                    </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-price"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Price
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


PriceUpdateModel.propTypes = {
    updatePrice: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updatePrice }
)(withRouter(PriceUpdateModel));
