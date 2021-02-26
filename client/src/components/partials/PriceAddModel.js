import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPrice } from "../../actions/priceActions";
import { withRouter } from "react-router-dom";
import $ from 'jquery'


import 'react-toastify/dist/ReactToastify.css';

class PriceAddModel extends React.Component {

 constructor() {
    super();
    this.state = {
        id: '',
        category_id: '',
        amount: '',
        uom: '',
        location: '',
        description: '',
        status: '',
        featured: '',
        errors: {},
    };
}

componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    if (nextProps.parentid) {
        this.setState({
            category_id: nextProps.parentid
        });
    }
        $('#add-price-modal').modal('hide');

}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
};

onPriceAdd = e => {
    e.preventDefault();
    const newPrice = {
        category_id: this.state.category_id,
        amount: this.state.amount,
        uom: this.state.uom,
        location: this.state.location,
        description: this.state.description,
        status: this.state.status,
        featured: this.state.featured
        
    };
    this.props.addPrice(newPrice, this.props.history);
};

render() {
    const { errors } = this.state;
    return (
        <div>
        <div className="modal fade" id="add-price-modal" data-reset="true">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        <h4 className="modal-title">Add Price</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
        <form noValidate onSubmit={this.onPriceAdd} id="add-price">

        <div className="row mt-2">
        <div className="col-md-3">
        <label htmlFor="amount">Amount</label>
        </div>
        <div className="col-md-9">
        <input
        onChange={this.onChange}
        value={this.state.amount}
        id="amount"
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
        id="uom"
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
        onChange={this.onChange} className="btn dropdown-toggle" id="location" type="text"

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
        id="description"
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
        id="status"
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
        id="status"
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
        id="featured"
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
        id="featured"
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
        form="add-price"
        type="submit"
        className="btn btn-primary">
        Add Price
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>
        )
}
}

PriceAddModel.propTypes = {
    addPrice: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addPrice }
    )(withRouter(PriceAddModel));

