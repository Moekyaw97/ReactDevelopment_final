import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCategory } from "../../actions/categoryActions";
import { withRouter } from "react-router-dom";
/*import { toast } from 'react-toastify';*/
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class CategoryUpdateModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            title: this.props.record.title,
            keywords: this.props.record.keywords,
            featured: this.props.record.featured,
            title_mm: this.props.record.title_mm,
            parent_id: this.props.record.parent_id,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                title: nextProps.record.title,
                keywords: nextProps.record.keywords,
                featured: nextProps.record.featured,
                title_mm: nextProps.record.title_mm,
                parent_id: nextProps.record.parent_id,
           
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
            $('#update-category-modal').modal('hide');
        
        }
    }


    onChange = e => {
        if (e.target.id === 'category-update-title') {
            this.setState({ title: e.target.value });
        }
        if (e.target.id === 'category-update-keywords') {
            this.setState({ keywords: e.target.value });
        }
        if (e.target.id === 'category-update-featured') {
            this.setState({ featured: e.target.value });
        }
        if (e.target.id === 'category-update-title_mm') {
            this.setState({ title_mm: e.target.value });
        }
    };

    onCategoryUpdate = e => {
        e.preventDefault();
        const newCategory = {
            _id: this.state.id,
            title: this.state.title,
            keywords: this.state.keywords,
            featured: this.state.featured,
            title_mm: this.state.title_mm
        };
        this.props.updateCategory(newCategory);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-category-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Category</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onCategoryUpdate} id="update-category">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="category-update-id"
                                        type="text"
                                        className="d-none"/>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="title">Title</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.title}
                                                error={errors.name}
                                                id="category-update-title"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.title
                                                })}
                                            />
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
                                                id="category-update-keywords"
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
                                            id="category-update-featured"
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
                                            id="category-update-featured"
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
                                                error={errors.title_mm}
                                                id="category-update-title_mm"
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
                                    form="update-category"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Category
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


CategoryUpdateModel.propTypes = {
    updateCategory: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateCategory }
)(withRouter(CategoryUpdateModel));
