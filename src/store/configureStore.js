import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootreducer from '../reducer/rootreducer';

const loggerForMiddleWare = createLogger()

export default function configureStore(){
    return createStore(rootreducer,applyMiddleware(thunkMiddleware,loggerForMiddleWare))
}