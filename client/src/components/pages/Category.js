import React, { Component, Fragment } from "react";
import { Redirect , useHistory } from "react-router-dom";
/*import { Router, browserHistory } from 'react-router';*/
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import CategoryAddModel from "../partials/CategoryAddModel";
import CategoryUpdateModel from "../partials/CategoryUpdateModel";
import PriceAddModel from "../partials/PriceAddModel";
import PriceUpdateModel from "../partials/PriceUpdateModel";
import { toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";



class Categories extends Component {


   constructor(props) {
        super(props);

        this.state = {list: [1, 2, 3],};
        
       /* this.handelBack=this.handleBack.bind(this);*/

        this.columns = [
            {
                key: "id",
                text: "Id",
                className: "id",
                align: "left",
                sortable: true,
            },
            {
                key: "title",
                text: "Title",
                className: "title",
                align: "left",
                sortable: true,
            },
            {
                key: "keywords",
                text: "Keywords",
                className: "keywords",
                align: "left",
                sortable: true
            },
            {
                key: "featured",
                text: "Featured",
                className: "featured",
                align: "left",
                sortable: true
            },
            {
                key: "title_mm",
                text: "Title_mm",
                className: "title_mm",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 150,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={(parent_id) => this.getButtonId(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-arrow-circle-right"></i>
                            </button>
                            &nbsp;
                            <button
                                data-toggle="modal"
                                data-target="#update-category-modal"
                                className="btn btn-warning btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.priceColumn = [
            {
                key: "category_id",
                text: "Category Parent Id",
                className: "category_id",
                align: "left",
                sortable: true,
            },
            {
                key: "amount",
                text: "Amount",
                className: "amount",
                align: "left",
                sortable: true,
            },
            {
                key: "uom",
                text: "UOM",
                className: "uom",
                align: "left",
                sortable: true,
            },
            {
                key: "location",
                text: "Location",
                className: "location",
                align: "left",
                sortable: true,
            },
               {
                key: "description",
                text: "Description",
                className: "description",
                align: "left",
                sortable: true,
            },
            {
                key: "status",
                text: "Status",
                className: "status",
                align: "left",
                sortable: true
            },
            {
                key: "featured",
                text: "Featured",
                className: "featured",
                align: "left",
                sortable: true
            },
            {
                key: "entry_date",
                text: "Date",
                className: "entry_date",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 150,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-price-modal"
                                className="btn btn-warning btn-sm"
                                onClick={() => this.editPriceRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deletePriceRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-trash"></i>
                            </button>
                           
                        </Fragment>
                    );
                }
            }
        ];






        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Categories",
            no_data_text: 'No category yet !',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Search in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                title: '',
                keywords: '',
                featured: '',
                title_mm: '',
                parent_id: '',
            },
            parentid: null
        };


         this.priceConfig = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Prices",
            no_data_text: 'No prices found!',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Search in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            priceRecords: []
        };

        this.state = {
            currentRecord: {
                id: '',
                category_id: '',
                amount: '',
                uom: '',
                location: '',
                description: '',
                status: '',
                featured: '',
                entry_date: '',
              
            },
        };


        this.getData = this.getData.bind(this);
    }

     
    getPriceData() {

        axios
            .post("/api/price-data")
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }

    editPriceRecord(record) {
        this.setState({ currentRecord: record});
    }
    
    deletePriceRecord(record) {
        axios
            .post("/api/price-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }


    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/category-data")
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }



    getButtonId(record) {
        console.log(record.id);
        this.state.parentid = record.id;
        this.state.title =record.title;
        this.state.category_id =record.id;
        /*this.state.page = [...this.state.parentid];*/
        axios
            .post("/api/category-data", { id : this.state.parentid }).then(res => {
                this.setState({ records: res.data});
            }).catch();
        axios
            .post("/api/price-data", { category_id : this.state.parentid }).then(res => {
                this.setState({ priceRecords: res.data});
            }).catch();
    }

    editRecord(record) {
        this.setState({ currentRecord: record});
    }
    
    deleteRecord(record) {
        axios
            .post("/api/category-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

            componentDidMount() {
                this.getData();
    
    }


/*removePage(e) {
  var array = [...this.state.page];
  var index = array.indexOf(e.target.value)
  if (index !== -1) {
    array.splice(index, 1);
    this.setState({page: array});
  }
}*/


handleBack(){
    /*const arr = ['1','2','3'];
    arr.pop();
    console.log(arr);*/

    window.history.go(-1);
    window.location.reload();

}


    render() {
        return (

            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <CategoryAddModel parentid={this.state.parentid}/>
                    <CategoryUpdateModel record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mr-2" data-toggle="modal" data-target="#add-category-modal"><FontAwesomeIcon icon={faPlus}/> Add Category</button>
                         <button className="btn btn-outline-primary float-right mr-2" onClick={this.handleBack}><i className="fa fa-arrow-left"></i>Back</button>
                            <h3 className="mt-5">Category List <span className="text-primary">{this.state.title}</span></h3>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />

                            <PriceAddModel parentid={this.state.parentid}/>
                            <PriceUpdateModel record={this.state.currentRecord}/>
                            <button className="btn btn-outline-primary float-right mr-2 mt-5" data-toggle="modal" data-target="#add-price-modal"><FontAwesomeIcon icon={faPlus}/> Add Price</button>
                            <h3 className="mt-5">Price List <span className="text-primary">{this.state.title}</span></h3>
                            <ReactDatatable
                                config={this.priceConfig}
                                records={this.state.priceRecords}
                                columns={this.priceColumn}
                                onPageChange={this.pageChange.bind(this)}
                            />                       
                        </div>
                       
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}


const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});


export default connect(
    mapStateToProps
)(Categories);
