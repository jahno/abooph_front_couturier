import {useState, useEffect, useRef} from "react";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { changeOrderArticleState } from "services/api";

export default function useData(){
    const location = useLocation()

    const [state, setState] = useState({
        order: location.state.order,
        articles: location.state.order.panier.articles,
        isLoading: {main: false, state: false},
        nav1: null,
        nav2: null,
    })

    const slider1 = useRef()
    const slider2 = useRef()

    useEffect(() => {
        setState(state => ({
            ...state, 
            nav1: slider1.current,
            nav2: slider2.current
        }));
    }, [state.articles])

    function handleChangeState(article, type){
        setState(state => ({
            ...state, 
            isLoading: {...state.isLoading, state: true}
        }));

        changeOrderArticleState(type, state.order.id, article.id, 
            (response) => {
                toast.success(response.msg)

                setState(state => {
                    const index = state.articles.findIndex(item => item.id == article.id)
                    const newArticles = [...state.articles]
                    newArticles[index].pivot.EtatConfection = `${parseInt(state.articles[index].pivot.EtatConfection) + 1}`

                    return{
                        ...state,
                        articles: newArticles, 
                        isLoading: {...state.isLoading, state: false}
                    }
                });
            },
            () => {
                setState(state => ({
                    ...state, 
                    isLoading: {...state.isLoading, state: false}
                }));
            }
        )
    }

    return {
        state,
        slider1,
        slider2,
        handleChangeState,
    }
}