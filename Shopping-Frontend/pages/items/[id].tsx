import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import UpdateItem from "../../components/UpdateItem/UpdateItem";

const UpdateShopItem = ({ isAuthenticated }) => {
    return (
        <>
          {
             isAuthenticated ? <UpdateItem/> : <h2 className="mt-5 text-center">Please <Link href="/auth/login"> login</Link> to access this</h2>
          }  
        </>
    );
};

UpdateShopItem.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(UpdateShopItem);