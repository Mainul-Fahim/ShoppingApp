import React, { Fragment, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createItems } from "../../actions/item";
import Alert from "../Layouts/Alert";
import { useRouter } from "next/router";

const AddItem = ({ createItems, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: "",
    });

    const router = useRouter();

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        createItems(formData);
        console.log(formData);
        setFormData({ name: "" });
        router.push('/');
    };

    return (
        <>
            <Alert/>
            {isAuthenticated ? <div className='container mt-5 mw5 mw6-ns center pt4 form-center divCenter'>
                <h3 className='large text-success'>Add Item</h3>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Add Item" />
                </form>
            </div>: <h2 className="mt-5 text-center" style={{marginTop: '10px', textAlign: 'center'}}>Please <Link href="/auth/login"> login</Link> to access this</h2>}
        </>
    );
};

AddItem.propTypes = {
    createItems: PropTypes.func,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createItems })(AddItem);