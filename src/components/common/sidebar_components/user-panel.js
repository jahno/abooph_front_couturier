import {connect} from "react-redux";
import React  from 'react'
import {ARTICLES_IMAGES_ROUTE} from '../../../api/routes'
import {logo as defaultLogo} from '../../../assets/images/public'

function UserPanel({user}) {
    const logo = user.logo ? `${ARTICLES_IMAGES_ROUTE}${user.logo}` : defaultLogo
    const timestamp = new Date().getTime()
    
    return (
        <div>
            <div className="sidebar-user text-center">
                <div><img className="img-60 rounded-circle lazyloaded blur-up" src={`${logo}?${timestamp}`} alt="" />
                </div>
                <h6 className="mt-3 f-14">{user.nom} {user.prenom}</h6>
                {/* <p>{user.roles ? user.roles[0] : 'Admin'}</p> */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user
    }
}

export default connect(mapStateToProps)(UserPanel);
  
  

