import React, { Fragment } from 'react'

import Breadcrumb from 'components/common/breadcrumb';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {ARTICLES_IMAGES_ROUTE as imgUrl} from 'api/routes';

import useData from './useData'

function ArticleDetail () {

    const {state, handleChangeState, slider1, slider2} = useData()
    
    const { articles, order } = state;

    // const nextState = article.Etat === 0 ? 2 : article.Etat === 2 ? 0 : article.Etat; 
    
    return (
        <Fragment>
            <Breadcrumb title="Détail Commande" parent="Commandes" parentUrl="commandes"/>
            
            <div className="container-fluid">
                <div className="card">
                    <div className="row product-page-main card-body">
                        <div className="col-xl-4">
                            <div>Total : {order.total} FCFA</div>
                            <div>Lieu de livraison : {order.adresse}</div>
                        </div>
                    </div>
                </div>
            </div>

            {articles.map(article => {
                return (
                    <div className="container-fluid">
                        <div className="card">
                            <div className="row product-page-main card-body">
                                <div className="col-xl-4">
                                    <Slider 
                                        asNavFor={state.nav2} 
                                        ref={slider1}
                                        className="product-slider"
                                    >
                                        {
                                            article.images.map(image => {
                                                return (
                                                    <div className="item" key={image}>
                                                        <img 
                                                            className="img-fluid" 
                                                            src={`${imgUrl}/${image.chemin}`}
                                                            alt={article.name} 
                                                        />
                                                    </div>
                                                )
                                            })
                                        }  
                                    </Slider>
                                    
                                    <Slider 
                                        asNavFor={state.nav1}
                                        ref={slider2}
                                        slidesToShow={article.images.length < 4 ? article.images.length: 4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        className={`${article.images.length > 1 ? "small-slick" : ""}`}
                                    >
                                        {article.images.length > 1 && (
                                            article.images.map(image => {
                                                return (
                                                    <div className="item" key={image}>
                                                        <img 
                                                            className="img-fluid" 
                                                            src={`${imgUrl}/${image.chemin}`}
                                                            alt={article.name} 
                                                        />
                                                    </div>
                                                )
                                            })
                                        )}  
                                    </Slider> 
                                </div>
                                <div className="col-xl-8">
                                    <div className="product-page-details product-right mb-0">
                                        <h2>{article.nom}</h2>
                                        <hr />
                                        <h6 className="product-title">Temps de confection</h6>
                                        <p>{article.temps_confection} {parseInt(article.temps_confection) > 1 ? "jours": "jour"}</p>
                                        <h6 className="product-title">Detail de l'article</h6>
                                        <p>{article.description}</p>
                                        <div className="product-price digits mt-2">
                                            <h3>{article.prix} FCFA <del>{article.prix_barre} FCFA</del></h3>
                                        </div>
                                        <hr />
                                        {!(article.pivot.EtatConfection == 2) && <div className="m-t-15">
                                            <button 
                                                className="btn btn-primary m-r-10" 
                                                type="button"
                                                onClick={() => handleChangeState(article, article.pivot.EtatConfection == 0 ? 'start' : 'end')}
                                                disabled={state.isLoading.state}
                                            >
                                                {article.pivot.EtatConfection == 0 ? 'Débuter la confection' : 'Finaliser la confection'}
                                            </button>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <br/>
        </Fragment>
    )
}

export default ArticleDetail
