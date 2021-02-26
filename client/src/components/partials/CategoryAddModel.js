import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCategory } from "../../actions/categoryActions";
import { withRouter } from "react-router-dom";
/*import { toast } from 'react-toastify';*/
import $ from 'jquery'


import 'react-toastify/dist/ReactToastify.css';

class CategoryAddModel extends React.Component {

 constructor() {
    super();
    this.state = {
        id: '',
        title: '',
        keywords: '',
        featured: '',
        title_mm: '',
        parent_id: '',
        errors: {},
    };
}

componentWillReceiveProps(nextProps) {
	console.log(nextProps);
	if (nextProps.parentid) {
		this.setState({
			parent_id: nextProps.parentid
		});
	}
 $('#add-category-modal').modal('hide');
     
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
};

onCategoryAdd = e => {
    e.preventDefault();
    const newCategory = {
        title: this.state.title,
        keywords: this.state.keywords,
        featured: this.state.featured,
        title_mm: this.state.title_mm,
        parent_id: this.state.parent_id 
    };
    this.props.addCategory(newCategory, this.props.history);
};

render() {
    const { errors } = this.state;
    return (
        <div>
        <div className="modal fade" id="add-category-modal" data-reset="true">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
        <h4 className="modal-title">Add Category</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
        <form noValidate onSubmit={this.onCategoryAdd} id="add-category">


        <div className="row mt-2">
        <div className="col-md-3">
        <label htmlFor="title">Title</label>
        </div>
        <div className="col-md-9">
        <input
        onChange={this.onChange}
        value={this.state.title}
        id="title"
        type="text"
        error={errors.title}
        className={classnames("form-control", {
            invalid: errors.title
        })}/>
        <span className="text-danger">{errors.title}</span>
        </div>
        </div>

        <div className="row mt-2">
        <div className="col-md-3">
        <label htmlFor="keywords">Keywords</label>
        </div>
        <div className="col-md-9">
        <input
        onChange={this.onChange}
        value={this.state.keywords}
        error={errors.keywords}
        id="keywords"
        type="text"
        className={classnames("form-control", {
            invalid: errors.keywords
        })}
        />
        <span className="text-danger">{errors.keywords}</span>
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

        <div className="row mt-2">
        <div className="col-md-3">
        <label htmlFor="title_mm">Title_mm</label>
        </div>
        <div className="col-md-9">
        <input
        onChange={this.onChange}
        value={this.state.title_mm}
        id="title_mm"
        type="text"
        className={classnames("form-control", {
            invalid: errors.title_mm
        })}
        />
        <span className="text-danger">{errors.title_mm}</span>
        </div>
        </div>

        </form>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button
        form="add-category"
        type="submit"
        className="btn btn-primary">
        Add Category
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>
        )
}
}

CategoryAddModel.propTypes = {
    addCategory: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addCategory }
    )(withRouter(CategoryAddModel));

