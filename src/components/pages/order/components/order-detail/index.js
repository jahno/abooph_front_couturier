import React, { Fragment } from 'react'

import Breadcrumb from 'components/common/breadcrumb';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {ARTICLES_IMAGES_ROUTE as imgUrl} from 'api/routes';
import {avatar} from 'assets/images/public'

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
                        {/* <div className="col-xl-4">
                            <div>Total : {order.total} FCFA</div>
                            <div>Lieu de livraison : {order.adresse}</div>
                        </div> */}

                        <div className="col-xl-4">
                            <div className="product-page-details product-right mb-0">
                                <h2>Commande</h2>
                                <hr />
                                <h6 className="product-title">Total</h6>
                                <p>{order.total} FCFA</p>
                                <h6 className="product-title">Lieu de livraison</h6>
                                <p>{order.adresse}</p>
                                <h6 className="product-title">Etat de la commande</h6>
                                <p style={{color: 'rgb(102, 209, 212)'}}>{order.etatText[order.etat]}</p>
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="product-page-details product-right mb-0">
                                <h2>Coursier</h2>
                                <hr />
                                <h6 className="product-title">Nom et prénom</h6>
                                <p>{order.coursier.nom} {order.coursier.prenom}</p>
                                {/* <h6 className="product-title">Zone d'intervention</h6>
                                <p>{order.coursier.Zone_intervention}</p>
                                <h6 className="product-title">Adresse géographique</h6>
                                <p>{order.coursier.Adresse_geographique}</p> */}
                                <h6 className="product-title">Téléphone</h6>
                                <p>{order.coursier.numero}</p>
                                <div><img src={`${imgUrl}/${order.coursier.avatar}`} width="40" height="40" alt="" style={{width: 40, height:40}}/></div>
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="product-page-details product-right mb-0">
                                <h2>Mesures</h2>
                                <hr />
                                {JSON.parse(order.mesure.descriptions).description.map(item => (
                                    <>
                                        <h6 className="product-title">{item.label}</h6>
                                        <p>{item.value}</p>
                                    </>
                                ))}
                            </div>
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
                                        {(article.pivot.EtatConfection == 1 || article.pivot.EtatConfection == 2) && <h6 className="product-title">Etat de l'article</h6>}
                                        <p style={{color: 'rgb(102, 209, 212)'}}>{article.pivot.EtatConfection == 1 && 'Début de la confection'}</p>
                                        <p style={{color: 'rgb(102, 209, 212)'}}>{article.pivot.EtatConfection == 2 && 'Fin de la confection'}</p>

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
