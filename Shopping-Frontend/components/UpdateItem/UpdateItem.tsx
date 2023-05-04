import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { updateItem } from "../../actions/item";

const UpdateItem = ({ updateItem }) => {

    const [formData, setFormData] = useState({
        name: "",
    });

    const router = useRouter();
    const updateId = useRouter().query.id;

    const onChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        router.reload();
        updateItem(formData, updateId);
        setFormData({ name: "" });
        router.push('/');
    };

    return (
        <>
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

                <input type="submit" className="btn btn-primary" value="Update Item" />
            </form>
        </>
    );
};


UpdateItem.propTypes = {
    updateItem: PropTypes.func,
};

const mapStateToProps = (state: any) => ({
    item: state.item,
});

export default connect(mapStateToProps, { updateItem })(UpdateItem);